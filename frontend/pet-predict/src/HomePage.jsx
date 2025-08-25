import HomePageHeader from './HomePageHeader';
import './CssFiles/HomePage.css';
import petImage from './assets/pets.jpg'; 

function HomePage() {
    return (
        <>
            <HomePageHeader />
            <main className="home-main">
                <div className="home-text">
                    <h1>Welcome to PetPredict!</h1>
                    <p>
                        PetPredict is your friendly app for identifying pets quickly. 
                        You can enter numerical values or upload an image to get instant results!
                    </p>
                    <h2>How it works?</h2>
                    <p>
                        - You can enter simple details like the weight and size of your pet to get a prediction between dog or cat.<br />
                        - Or you can upload a picture of your pet and receive 3 probabilities for the animal type, giving you multiple options for analysis.
                    </p>
                    <h2>Benefits:</h2>
                    <ul>
                        <li>Fast and easy to use 🕒</li>
                        <li>Friendly and intuitive interface 🎨</li>
                        <li>Fun and educational for pet lovers 🐶🐱</li>
                    </ul>
                    <p>
                        Try it now and see how accurate PetPredict can be!
                    </p>
                </div>
                <div className="home-image">
                    <img src={petImage} alt="Pets" />
                </div>
            </main>
        </>
    );
}

export default HomePage;
