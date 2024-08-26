import express from 'express';
import cors from 'cors';
import ytdl from 'ytdl-core';

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.post('/stream', async (req, res) => {
    console.log('Requête reçue :', req.body);
    const { videoUrl } = req.body;
    console.log('URL reçue:', videoUrl);

    if (!videoUrl) {
        return res.status(400).json({ error: 'URL manquante' });
    }

    try {
        const info = await ytdl.getInfo(videoUrl);
        const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });
        
        if (!format || !format.url) {
            return res.status(400).json({ error: 'Impossible de trouver un format vidéo approprié' });
        }

        res.header('Content-Disposition', `inline; filename="${info.videoDetails.title}.mp4"`);
        res.header('Content-Type', 'video/mp4');

        // Stream la vidéo directement
        ytdl(videoUrl, { format: format })
            .pipe(res)
            .on('finish', () => {
                console.log('Streaming terminé');
            })
            .on('error', (err) => {
                console.error('Erreur lors du streaming:', err);
                res.status(500).json({ error: 'Erreur lors du streaming de la vidéo' });
            });
    } catch (error) {
        console.error('Erreur dans le bloc try:', error);
        res.status(500).json({ error: 'Erreur lors de l\'analyse : ' + error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});