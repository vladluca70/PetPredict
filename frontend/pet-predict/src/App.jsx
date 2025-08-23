import './App.css';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import AboutPage from './AboutPage';
import SignupPage from './SignupPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />}/>
    </Routes>
  );
}

export default App;
