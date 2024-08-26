import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleCTAClick = () => {
    navigate("/download");
  };

  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple Video Downloader</h1>
        <p className="text-xl mb-8">Téléchargez vos vidéos préférées rapidement et facilement.</p>
        <button 
          onClick={handleCTAClick} 
          className="bg-white text-blue-600 font-bold py-2 px-6 rounded-full hover:bg-blue-100 transition duration-300"
        >
          Télécharger Maintenant
        </button>
      </div>
    </section>
  );
};

export default HeroSection;