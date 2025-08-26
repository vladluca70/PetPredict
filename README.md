# 🐾 PetPredict (MERN + Python)

This project is a full-stack web application (MERN stack + Python) designed to predict whether a pet is a dog or a cat, either from numeric input or from an image.

## 🔧 Technologies

- **Frontend:** React, HTML, CSS  
- **Backend:** Node.js, Express  
- **Authentication:** bcrypt (password hashing)  
- **Machine Learning:** Python, Pandas, scikit-learn, PyTorch, Flask
- **Model Management:** joblib (save/load model)  
- **Database:** MongoDB  
- **Testing/Automation:** Selenium  
- **Other:** CORS, Flask API  

## 🚀 Key Features

- Create an account with a username and password  
- Passwords are hashed and stored in MongoDB using bcrypt  
- Users must log in to access prediction pages  
- **Predict Pet (Numeric):** Users enter numeric values about the pet, which are sent to a Flask backend running a pre-trained regression model; the result (dog or cat) is displayed on the page  
- **Predict Image:** Users upload a photo of a pet; the Flask backend uses a ResNet50 neural network to classify the image and return the result  

## 🧪 Automated Tests (Selenium)

- Tests implemented for login, signup, and both prediction pages  
- Selenium automates user interactions and verifies correct functionality  
- Ensures that authentication and prediction flows work as expected  

## 🧠 Machine Learning Models

- **Numeric Prediction:** Pre-trained regression model loaded with joblib  
- **Image Prediction:** Pre-trained ResNet50 neural network for image classification  
- Numeric dataset sourced from Kaggle  
- Python libraries used: pandas, scikit-learn, torch, joblib, selenium  

## 🔒 Security

- Authentication via username and password  
- Passwords stored securely as hashes in MongoDB using bcrypt  
- Users cannot access prediction pages without logging in  
- CORS enabled for communication between frontend and Python/Node.js APIs  

📁 **Project Structure**

```bash
MERN-AIHomePredict  
├── ai_ml/               # Flask + ML models (numeric + image prediction) 
├── backend/             # Express + MongoDB + authentication  
├── frontend/            # React + forms for numeric input & image upload
├── selenium-tests/      # Selenium tests for login, signup, and prediction page
└── README.md
```

🚀 **How to Run the Project Locally**

```bash
git clone https://github.com/vladluca70/PetPredict
cd PetPredict/
```

**First terminal:**  
```bash
cd backend
node server.js
```

**Second terminal:**  
```bash
cd ai_ml
source venv/bin/activate
python3 backend.py
```

**Third terminal:**  
```bash
cd frontend/pet-predict/
npm run dev
```


📬 **Contact**  
For questions or suggestions, please reach out at: [vladluca70@email.com]