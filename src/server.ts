import express from 'express';
import { configureCORS } from './middlewares/cors-middlewares.js';
import carRouter from './routes/cars-route.js';

const port = 3000;
const app = express();
app.use(express.json());

configureCORS(app);

app.use('/cars', carRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});