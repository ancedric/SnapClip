import { useState } from 'react';
import axios from 'axios';

const DownloadPage = () => {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [error, setError] = useState('');

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const analyzeUrl = async () => {
    // Envoyer l’URL au serveur pour analyse
    try {
      const response = await axios.post('http://localhost:3000/analyze', { url });
      return response.data;
    } catch (err) {
      setError('Erreur lors de l\'analyse de l\'URL : ' + err.message);
      throw err;
    }
  };

  const analyzeFile = async (file) => {
    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await axios.post('http://localhost:3000/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (err) {
      setError('Erreur lors de l\'analyse du fichier : ' + err.message);
      throw err;
    }
  };

  const searchVideos = async (query) => {
    const apiKey = 'YOUT_API_KEY';
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        key: apiKey,
      },
    });

    return response.data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
  };

  const handleSearch = async () => {
    try {
      let characteristics;

      if (url) {
        characteristics = await analyzeUrl();
      } else if (file) {
        characteristics = await analyzeFile(file);
      } else {
        setError('Veuillez entrer une URL ou sélectionner un fichier vidéo.');
        return;
      }

      const query = `brightness:${characteristics.brightness} sceneChanges:${characteristics.sceneChanges}`;
      const searchResults = await searchVideos(query);
      setResults(searchResults);
      setError(''); // Réinitialiser l'erreur
    } catch {
      // Erreur déjà gérée dans les fonctions d'analyse
    }
  };

  const handlePreview = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  return (
    <div className="download-container">
      <h2>Trouver la Vidéo Originale</h2>
      <input
        type="text"
        placeholder="URL de la vidéo"
        value={url}
        onChange={handleUrlChange}
      />
      <input type="file" onChange={handleFileChange} />
      <button className="download-btn" onClick={handleSearch}>
        Analyser
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {results.length > 0 && (
        <div className="results">
          <h3>Résultats :</h3>
          <ul>
            {results.map((video) => (
              <li key={video.id}>
                {video.title}
                <button onClick={() => handlePreview(video.url)}>Prévisualiser</button>
                <a href={video.url} target="_blank" rel="noopener noreferrer" className="download-link">Télécharger</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedVideo && (
        <div className="video-preview">
          <h3>Aperçu de la vidéo :</h3>
          <iframe
            width="560"
            height="315"
            src={selectedVideo.replace('watch?v=', 'embed/')}
            title="Aperçu de la vidéo"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default DownloadPage;