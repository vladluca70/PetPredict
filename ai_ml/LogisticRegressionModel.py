import pandas as pd
from sklearn.linear_model import LogisticRegression
import joblib

df = pd.read_csv('cat-dog-classification.csv')

X = df[['Height', 'Weight', 'Ear Size',
        'Tail Length']]
y = df['Label']

model = LogisticRegression()
model.fit(X, y)

# dataTest = pd.DataFrame({
#     'Height': [10.2],
#     'Weight': [13.5],
#     'Ear Size': [15.0], 
#     'Tail Length': [3.0]    
# })

joblib.dump(model, 'model.joblib')