import { Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import DownloadPage from './Components/DownloadPage';
import './App.css';
const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/download" element={<DownloadPage />} />
    <Route path="*" element={<h2>404 - Page Not Found</h2>} />
  </Routes>
);

export default App;