import express from 'express';
import cors from'cors';
import ffmpeg from'fluent-ffmpeg';
import ytdl from'ytdl-core';
const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post('/analyze', async (req, res) => {
  const { videoUrl } = req.body;

  if (!videoUrl) {
    return res.status(400).send('URL manquante');
  }

  try {
    const stream = ytdl(videoUrl, { quality: 'highestvideo' });

    // Configuration de FFmpeg pour analyser la vidéo
    ffmpeg(stream)
      // eslint-disable-next-line no-useless-escape
      .outputOptions('-vf', 'select=gt(scene\,0.4)', '-showinfo')
      .on('end', () => {
        console.log('Analyse terminée.');
      })
      .on('error', (err) => {
        console.error('Erreur lors de l\'analyse :', err);
        return res.status(500).send('Erreur lors de l\'analyse');
      })
      .ffprobe((err, data) => {
        if (err) {
          return res.status(500).send('Erreur lors de l\'extraction des données');
        }

        // Exemple d'extraction de données
        const brightness = data.streams[0].avg_frame_rate; // Ajuster selon vos besoins
        const sceneChanges = data.streams[0].nb_frames; // Compte des frames

        res.json({
          brightness,
          sceneChanges,
        });
      })
      .run();
  } catch (error) {
    res.status(500).send('Erreur lors de l\'analyse');
  }
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});