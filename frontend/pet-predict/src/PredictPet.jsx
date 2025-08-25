import { useState } from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css'; 

function PredictPet(){
    const [height, setHeight]=useState('')
    const [weight, setWeight]=useState('')
    const [earSize, setEarSize]=useState('')
    const [tailLength, setTailLength]=useState('')
    const [predictedLabel, setPredictedLabel]=useState('')
    const [errorMessage, setErrorMessage]=useState('')
    const userValid=localStorage.getItem('userValid')
    const username=localStorage.getItem('username')

    function handleHeight(e){
        setHeight(e.target.value)
    }

    function handleWeight(e){
        setWeight(e.target.value)
    }

    function handleEarSize(e){
        setEarSize(e.target.value)
    }

    function handleTailLength(e){
        setTailLength(e.target.value)
    }

    async function sendDataFunction() {
        const data={
            height:parseFloat(height),
            weight:parseFloat(weight),
            earSize:parseFloat(earSize),
            tailLength:parseFloat(tailLength)
        }

        fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            if (data.predicted_label) {
                //alert(`Predicted price: $${data.predicted_price.toFixed(2)}`);
                setPredictedLabel(data.predicted_label)
            } else {
                setErrorMessage("Prediction failed: " + data.error);
            }
        })
        .catch(err => {
            console.error(err);
            setErrorMessage("Server error");
        });
    }

    if (userValid === 'yes') {
    return (
      <div className="about-container">
        <h3 className="header">Hello {username}!</h3>

        <div className="section">
          <h4>Enter Animal Features</h4>
          <input 
            type="number" 
            className="form-input" 
            onChange={(e) => handleHeight(e)} 
            placeholder="Height (0-100)" 
            required 
          />
          <input 
            type="number" 
            className="form-input" 
            onChange={(e) => handleWeight(e)} 
            placeholder="Weight (0-100)" 
            required 
          />
          <input 
            type="number" 
            className="form-input" 
            onChange={(e) => handleEarSize(e)} 
            placeholder="Ear Size (0-100)" 
            required 
          />
          <input 
            type="number" 
            className="form-input" 
            onChange={(e) => handleTailLength(e)} 
            placeholder="Tail Length (0-100)" 
            required 
          />
          <button className="action-button" onClick={sendDataFunction}>Send Data</button>

          {predictedLabel && <p className="prediction-message">{predictedLabel}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <Link to="/" className="home-link">Go back home</Link>
        </div>
      </div>
    );
} else {
    return (
      <div className="about-container">
        <h2 className="header">You must be logged in</h2>
        <Link to="/" className="home-link">Go back home</Link>
      </div>
    );
}

}

export default PredictPet;