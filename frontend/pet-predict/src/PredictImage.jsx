import { useState } from "react";
import { Link } from "react-router-dom";

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

    if(userValid === "yes"){
        return(
            <>
                <h2>Welcome {username}</h2> <br/>
                <input onChange={handleChangeImage} placeholder="It must be an image" type="file" /> <br/>
                <button onClick={sendImgFunction}>Predict the pet from image</button>
                <Link to="/" style={{ margin: '0 10px' }}>Go back home</Link>
                
                {image && (
                    <img 
                        src={URL.createObjectURL(image)} 
                        alt="preview" 
                        style={{ maxWidth: '200px', marginTop: '10px' }} 
                    />
                )}

                {predictions.length > 0 && (
                    <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
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
            <Link to="/" style={{ margin: '0 10px' }}>Go back home</Link>
            </>
        )
    } else {
        return(
            <>
                <h2>You must be logged in</h2> <br/>
                <Link to="/" style={{ margin: '0 10px' }}>Go back home</Link>
            </>
        )
    }
}

export default PredictImage;
