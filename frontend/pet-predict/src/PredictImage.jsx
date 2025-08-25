import { useState } from "react";
import { Link } from "react-router-dom";
import './AboutPage.css'; 

function PredictImage(){
    const [image, setImage] = useState(null);
    const [predictions, setPredictions] = useState([]); // <-- array pentru top 3 predicții
    const userValid = localStorage.getItem('userValid');
    const username = localStorage.getItem('username');

    function handleChangeImage(e){
        const file = e.target.files[0];
        if(file){
            setImage(file);
            setPredictions([]); // resetează predicțiile la schimbarea imaginii
        }
    }
    
    async function sendImgFunction() {
        if(!image) return;

        const formData = new FormData();
        formData.append("_image", image);

        try {
            const response = await fetch("http://localhost:5000/predict-img", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            console.log(result);

            if(result.predictions){
                setPredictions(result.predictions); // setează toate predicțiile
            } else if(result.error){
                setPredictions([{ label: "Error", probability: 0 }]);
            }

        } catch (error) {
            console.error("Eroare la trimiterea imaginii:", error);
            setPredictions([{ label: "Error", probability: 0 }]);
        }
    }

    if (userValid === "yes") {
    return (
      <div className="about-container">
        <h2 className="header">Welcome {username}!</h2>

        <div className="section">
          <h4>Predict Pet from Image</h4>
          <input 
            type="file" 
            accept="image/*" 
            className="form-input file-input" 
            onChange={handleChangeImage} 
          />
          <button className="action-button" onClick={sendImgFunction}>Predict the pet from image</button>

          {image && (
            <img 
              src={URL.createObjectURL(image)} 
              alt="preview" 
              className="preview-image"
            />
          )}

          {predictions.length > 0 && (
            <div className="prediction-list">
              <h3>Predictions:</h3>
              <ul>
                {predictions.map((p, index) => (
                  <li key={index}>
                    {p.label} - {p.probability}%
                  </li>
                ))}
              </ul>
            </div>
          )}

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

export default PredictImage;
