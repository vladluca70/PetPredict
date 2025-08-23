import './App.css';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import AboutPage from './AboutPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}

export default App;
