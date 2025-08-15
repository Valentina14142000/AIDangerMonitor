import pandas as pd
import folium
from folium.plugins import HeatMap
from folium import FeatureGroup, LayerControl, CircleMarker
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, accuracy_score
import joblib
from sklearn.model_selection import RandomizedSearchCV
import numpy as np
from imblearn.over_sampling import SMOTE



# Load the dataset
file_path = "/Users/valentina/Desktop/data/2024-11-city-of-london-outcomes.csv"
df = pd.read_csv(file_path)

# Show basic info and first few rows to understand the structure
df.info(), df.head()

#Check for missing values
df = df.dropna(subset=["Longitude", "Latitude"])

#Assigning risk levels
risk_map = {
    "Investigation complete; no suspect identified": 4,
    "Unable to prosecute suspect": 4,
    "No suspect identified": 4,
    "Offender given a caution": 3,
    "Offender given community sentence": 3,
    "Defendant found not guilty": 2,
    "Offender given a drugs possession warning": 2,
    "Suspect charged": 1,
    "Formal action is not in the public interest": 3,
    "Further investigation is not in the public interest": 3,
    "Under investigation": 3,
    "Local resolution": 2,
    "Offender sent to prison": 1,
    "Court case unable to proceed": 3,
    "Action to be taken by another organisation": 3,
    "Awaiting court outcome": 2,
    "Penalty notice issued": 2,
    "Community resolution": 2,
    "Status update unavailable": 3,
    "Other": 3,
    "Investigation complete; offender not identified": 4,
    "Court result unavailable": 3,
    "Offender fined": 2,
    "Offender given suspended prison sentence": 2,
    "Offender deprived of property": 2,
    "Offender ordered to pay compensation": 2,
    "Awaiting decision": 2
}

df["Risk Score"] = df["Outcome type"].map(risk_map).fillna(3)

#convert the risk score into risk level labels
def label_risk(score):
    if score <= 2:
        return "Safe"
    elif score == 3:
        return "Moderate"
    else:
        return "Dangerous"

df["Risk Level"] = df["Risk Score"].apply(label_risk)
print(df[["Longitude", "Latitude", "Outcome type", "Risk Score", "Risk Level"]].head())
output_path = "/Users/valentina/Desktop/data/processed_crime_data.csv"
df.to_csv(output_path, index=False)
print(f"✅ Processed data saved to: {output_path}")

#load the processed data
df = pd.read_csv("/Users/valentina/Desktop/data/processed_crime_data.csv")

#drop unnecessary columns
df = df.dropna(subset=["Latitude", "Longitude", "Risk Score"])

#base map centered on London city
base_map = folium.Map(location=[51.5155, -0.0922], zoom_start=13)

#heatmap layer by risk score
heat_data = [[row['Latitude'], row['Longitude'], row['Risk Score']] for index, row in df.iterrows()]
HeatMap(heat_data, radius=10, blur=15, max_zoom=1).add_to(base_map)

#save and display the map
base_map.save("heatmap_risk_score.html")
print("✅ Heatmap by Risk Score saved as heatmap_risk_score.html")

#reload the processed data
df = pd.read_csv("/Users/valentina/Desktop/data/processed_crime_data.csv")

# Create a base map centered on London
base_map = folium.Map(location=[51.5155, -0.0922], zoom_start=13)


# Define color mapping for each risk level
color_map = {
    "Safe": "green",
    "Moderate": "orange",
    "Dangerous": "red"
}

# Create feature groups for each risk level
for level in df["Risk Level"].unique():
    fg = FeatureGroup(name=level)
    subset = df[df["Risk Level"] == level]
    for _, row in subset.iterrows():
        CircleMarker(
            location=[row["Latitude"], row["Longitude"]],
            radius=5,
            color=color_map.get(row["Risk Level"], "blue"),
            fill=True,
            fill_opacity=0.7,
            popup=row["Outcome type"]
        ).add_to(fg)
    fg.add_to(base_map)

LayerControl().add_to(base_map)

base_map.save("heatmap_risk_level.html")
print("✅ Risk Level heatmap saved as heatmap_risk_level.html")

#load the processed data
df = pd.read_csv("/Users/valentina/Desktop/data/processed_crime_data.csv")

#drop unnecessary columns
df = df.dropna(subset=["Latitude", "Longitude", "Risk Level"])

#encode Risk Level into numerical values
label_encoder = LabelEncoder()
df["Risk Label"] = label_encoder.fit_transform(df["Risk Level"])

#split the data into training and testing sets
X = df[["Latitude", "Longitude"]]   
y = df["Risk Label"]                

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

#train the Random Forest Classifier
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)


#evaluate the model performance
y_pred = model.predict(X_test)

print("✅ Accuracy:", accuracy_score(y_test, y_pred))
print("\n📊 Classification Report:\n", classification_report(y_test, y_pred, target_names=label_encoder.classes_))

#save the model
joblib.dump(model, "risk_level_model.pkl")
joblib.dump(label_encoder, "risk_label_encoder.pkl")
print("✅ Model and encoder saved")

#predicting new coordinates
lat, lon = 51.510665, -0.087772	
predicted_label = model.predict([[lat, lon]])
predicted_risk = label_encoder.inverse_transform(predicted_label)

print(f"📍 Location ({lat}, {lon}) predicted as: {predicted_risk[0]}")

# Convert Month (like '2024-11') to numeric
df["Month_Num"] = pd.to_datetime(df["Month"], errors='coerce').dt.month

# Initialize LabelEncoder
outcome_encoder = LabelEncoder()

# Fit and transform the Outcome type
df["Outcome_Encoded"] = outcome_encoder.fit_transform(df["Outcome type"])


#parameters for RandomizedSearchCV
param_dist = {
    'n_estimators': np.arange(50, 201, 50),
    'max_depth': [None, 10, 20, 30, 40],
    'min_samples_split': np.arange(2, 11, 2),
    'min_samples_leaf': np.arange(1, 5, 1),
    'max_features': ['auto', 'sqrt', 'log2'],
    'bootstrap': [True, False]
}

#random forest model
rf = RandomForestClassifier(random_state=42)

#perform RandomizedSearchCV
random_search = RandomizedSearchCV(estimator=rf, param_distributions=param_dist, 
                                   n_iter=10, cv=5, random_state=42, n_jobs=-1, verbose=2)

#fit the model to the data
random_search.fit(X_train, y_train)

#best parameters
print(f"Best Hyperparameters: {random_search.best_params_}")

#best model
best_rf_model_random = random_search.best_estimator_

#evaluate the best model
y_pred_best_random = best_rf_model_random.predict(X_test)
print(f"✅ Best Randomized Model Accuracy: {accuracy_score(y_test, y_pred_best_random)}")
print("\n📊 Classification Report for Randomized Best Model:\n", classification_report(y_test, y_pred_best_random, target_names=label_encoder.classes_))

#imbalance confirmation
print(df["Risk Level"].value_counts())

#handling imbalance 
model = RandomForestClassifier(
    class_weight='balanced',
    n_estimators=100,
    max_depth=20,
    random_state=42
)


#splitting the data
X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, test_size=0.2, random_state=42)

#apply SMOTE
sm = SMOTE(random_state=42)
X_train_res, y_train_res = sm.fit_resample(X_train, y_train)


