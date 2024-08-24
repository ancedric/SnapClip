import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleCTAClick = () => {
    navigate("/download");
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Simple Video Downloader</h1>
        <p>Téléchargez vos vidéos préférées rapidement et facilement.</p>
        <button onClick={handleCTAClick} className="cta-btn">
          Télécharger Maintenant
        </button>
      </div>
    </section>
  );
};

export default HeroSection;