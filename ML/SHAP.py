import pandas as pd
import numpy as np
import shap
from xgboost import XGBClassifier
from sklearn.preprocessing import LabelEncoder
import joblib
import matplotlib.pyplot as plt

# Load preprocessed data
df = pd.read_csv("/Users/valentina/Desktop/data/processed_crime_data.csv")

# Drop missing values in relevant columns
df = df.dropna(subset=["Latitude", "Longitude", "Outcome type", "Risk Level", "Month"])

# Convert 'Month' to numerical format
df["Month_Num"] = pd.to_datetime(df["Month"], errors='coerce').dt.month

# Encode categorical variables
outcome_encoder = LabelEncoder()
df["Outcome_Encoded"] = outcome_encoder.fit_transform(df["Outcome type"])

label_encoder = LabelEncoder()
df["Risk Label"] = label_encoder.fit_transform(df["Risk Level"])

# Prepare feature set
X = df[["Latitude", "Longitude", "Month_Num", "Outcome_Encoded"]]

# Load the trained XGBoost model
model = joblib.load("fine_tuned_xgb_model.pkl")

# Make sure the model is an XGBClassifier
assert isinstance(model, XGBClassifier), "Loaded model is not an XGBClassifier."

# For SHAP, use the TreeExplainer for tree-based models
explainer = shap.TreeExplainer(model)

# Compute SHAP values
shap_values = explainer.shap_values(X)

# Plot SHAP summary plot
plt.figure()
shap.summary_plot(shap_values, X, show=False)
plt.tight_layout()

# Save the plot
plt.savefig("/Users/valentina/Desktop/shap_summary_plot.png")
plt.close()