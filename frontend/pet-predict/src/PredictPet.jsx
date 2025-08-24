import { useState } from 'react';
import { Link } from 'react-router-dom';


function PredictPet(){
    const [height, setHeight]=useState('')
    const [weight, setWeight]=useState('')
    const [earSize, setEarSize]=useState('')
    const [tailLength, setTailLength]=useState('')
    const [predictedLabel, setPredictedLabel]=useState('')
    const [errorMessage, setErrorMessage]=useState('')

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
                setPredictedLabel(data.predicted_label.toFixed(2))
            } else {
                setErrorMessage("Prediction failed: " + data.error);
            }
        })
        .catch(err => {
            console.error(err);
            setErrorMessage("Server error");
        });
    }

    return(
        <>
            hello
            Height: <input type="number" onChange={(e)=>handleHeight(e)} placeholder="A number between 0 and 100" required/><br/>
            Weight: <input type="number" onChange={(e)=>handleWeight(e)} placeholder="A number between 0 and 100" required/><br/>
            Ear size: <input type="number" onChange={(e)=>handleEarSize(e)} placeholder="A number between 0 and 100" required/><br/>
            Tail Length: <input type="number" onChange={(e)=>handleTailLength(e)} placeholder="A number between 0 and 100" required/><br/>
            <button onClick={sendDataFunction}>Send Data</button>
            
            {predictedLabel && <p>{predictedLabel}</p>}
            {errorMessage && <p>{errorMessage}</p>}
            <Link to="/" style={{ margin: '0 10px' }}>Go back home</Link> <br/>
        </>
    )
}

export default PredictPet;