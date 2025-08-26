# 🏠 PetPredict (MERN + Python)

This project is a full-stack web application (MERN stack + Python) designed to predict whether a pet is a dog or a cat, either from numeric input or from an image.

## 🔧 Technologies

- **Frontend:** React, HTML, CSS  
- **Backend:** Node.js, Express  
- **Authentication:** bcrypt (password hashing)  
- **Machine Learning:** Python, Pandas, scikit-learn, PyTorch, Flask, Selenium  
- **Model Management:** joblib (save/load model)  
- **Database:** MongoDB  
- **Other:** CORS, Flask API  

## 🚀 Key Features

- Create an account with a username and password  
- Passwords are hashed and stored in MongoDB using bcrypt  
- Users must log in to access prediction pages  
- **Predict Pet (Numeric):** Users enter numeric values about the pet, which are sent to a Flask backend running a pre-trained regression model; the result (dog or cat) is displayed on the page  
- **Predict Image:** Users upload a photo of a pet; the Flask backend uses a ResNet50 neural network to classify the image and return the result  
