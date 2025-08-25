import HomePage from './HomePage';
import LoginPage from './LoginPage';
import AboutPage from './AboutPage';
import SignupPage from './SignupPage';
import { Routes, Route } from 'react-router-dom';
import PredictPet from './PredictPet';
import PredictImage from './PredictImage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />}/>
      <Route path="/predictpet" element={<PredictPet />}/>
      <Route path='/predictimage' element={<PredictImage/>} />
    </Routes>
  );
}

export default App;
