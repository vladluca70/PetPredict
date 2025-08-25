import { useState } from "react";
import { Link } from "react-router-dom";


function PredictImage(){
    const [image, setImage]=useState(null)
    const userValid=localStorage.getItem('userValid')
    const username=localStorage.getItem('username')

    function handleChangeImage(e){
        const file=e.target.files[0];
        if(file){
            setImage(file);
        }
    }
    
    async function sendImgFunction() {
        const formData = new FormData();
        formData.append("_image", image);
            try {
        const response = await fetch("http://localhost:5000/predict-img", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        console.log(result);
        alert("Imagine trimisă cu succes!");
        } catch (error) {
            console.error("Eroare la trimiterea imaginii:", error);
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
            </>
        )
    }
    else{
        return(
            <>
                <h2>You must be logged in</h2> <br/>
                <Link to="/" style={{ margin: '0 10px' }}>Go back home</Link>
            </>
        )
    }
}

export default PredictImage;