import { useState } from 'react';

const DownloadPage = () => {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleStreamVideo = () => {
    setLoading(true);
    setError('');
    // eslint-disable-next-line no-useless-escape
    const idMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/);
    
    if (idMatch) {
      setVideoId(idMatch[1]);
    } else {
      setError('Veuillez entrer une URL YouTube valide.');
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Streamer une Vidéo YouTube</h2>
      <input
        type="text"
        placeholder="URL de la vidéo YouTube"
        value={url}
        onChange={handleUrlChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button
        className={`w-full py-2 rounded ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white hover:bg-blue-600`}
        onClick={handleStreamVideo}
        disabled={loading}
      >
        {loading ? 'Chargement...' : 'Streamer la Vidéo'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {videoId && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Aperçu de la vidéo :</h3>
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default DownloadPage;