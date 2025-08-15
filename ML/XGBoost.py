import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, RandomizedSearchCV, StratifiedKFold
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, accuracy_score
from sklearn.utils.class_weight import compute_sample_weight
from xgboost import XGBClassifier
from imblearn.over_sampling import SMOTE
import joblib
from sklearn.metrics import ConfusionMatrixDisplay

# Load processed data
df = pd.read_csv("/Users/valentina/Desktop/data/processed_crime_data.csv")

# Drop missing values
df = df.dropna(subset=["Latitude", "Longitude", "Outcome type", "Risk Level", "Month"])

# Convert categorical to numeric features
df["Month_Num"] = pd.to_datetime(df["Month"], errors='coerce').dt.month
outcome_encoder = LabelEncoder()
df["Outcome_Encoded"] = outcome_encoder.fit_transform(df["Outcome type"])

# Encode Risk Levels
label_encoder = LabelEncoder()
df["Risk Label"] = label_encoder.fit_transform(df["Risk Level"])

# Features and labels
X = df[["Latitude", "Longitude", "Month_Num", "Outcome_Encoded"]]
y = df["Risk Label"]

# Split with stratification
X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, test_size=0.2, random_state=42)

# Handle imbalance with SMOTE
sm = SMOTE(random_state=42)
X_train_res, y_train_res = sm.fit_resample(X_train, y_train)

# Apply class weights
sample_weights = compute_sample_weight(class_weight='balanced', y=y_train_res)

# Define parameter grid
param_dist = {
    'n_estimators': [100, 150, 200],
    'max_depth': [4, 6, 8, 10],
    'learning_rate': [0.01, 0.05, 0.1],
    'gamma': [0, 1, 5],
    'subsample': [0.6, 0.8, 1.0],
    'colsample_bytree': [0.6, 0.8, 1.0]
}

# Base XGB model
xgb = XGBClassifier(random_state=42, objective='multi:softprob', eval_metric='mlogloss', use_label_encoder=False)

# Cross-validation with stratified folds
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

# Randomized Search for Hyperparameter Tuning
random_search = RandomizedSearchCV(
    estimator=xgb,
    param_distributions=param_dist,
    n_iter=20,
    scoring='f1_macro',
    n_jobs=-1,
    cv=cv,
    verbose=2,
    random_state=42
)

# Fit model with tuned hyperparameters
random_search.fit(X_train_res, y_train_res, sample_weight=sample_weights)

# Best model
best_model = random_search.best_estimator_

# Evaluation on test set
y_pred = best_model.predict(X_test)
print(f"✅ XGBoost Accuracy: {accuracy_score(y_test, y_pred)}\n")
print("📊 Classification Report:\n", classification_report(y_test, y_pred, target_names=label_encoder.classes_))

# Save model and encoders
joblib.dump(best_model, "fine_tuned_xgb_model.pkl")
joblib.dump(label_encoder, "risk_label_encoder.pkl")
joblib.dump(outcome_encoder, "outcome_label_encoder.pkl")
print("✅ Model and encoders saved")

# Predicting new location
lat, lon = 51.510665, -0.087772
month_num = 11  # November
sample_outcome = "Investigation complete; no suspect identified"

# Ensure outcome is encoded
encoded_outcome = outcome_encoder.transform([sample_outcome])[0]
sample_X = pd.DataFrame([[lat, lon, month_num, encoded_outcome]], columns=X.columns)

predicted_label = best_model.predict(sample_X)
predicted_risk = label_encoder.inverse_transform(predicted_label)
print(f"📍 Location ({lat}, {lon}) predicted as: {predicted_risk[0]}")


ConfusionMatrixDisplay.from_estimator(best_model, X_test, y_test, display_labels=label_encoder.classes_)
