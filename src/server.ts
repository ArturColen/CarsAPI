import express from 'express';
import { configureCORS } from './middlewares/cors.middlewares.js';
import router from './routes';

const port = 3000;
const app = express();

configureCORS(app);

app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});