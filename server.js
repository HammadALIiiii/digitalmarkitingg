import ViteExpress from 'vite-express';
import app from './api/index.js';

const PORT = process.env.PORT || 3000;

ViteExpress.listen(app, PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📁 Data stored in: ./data/`);
});
