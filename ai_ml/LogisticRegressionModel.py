import pandas as pd
from sklearn.linear_model import LogisticRegression
import joblib

df = pd.read_csv('cat-dog-classification.csv')

X = df[['Height', 'Weight', 'Ear Size',
        'Tail Length']]
y = df['Label']

model = LogisticRegression()
model.fit(X, y)

joblib.dump(model, 'model.joblib')