import express, { Request, Response } from 'express';
import { configureCORS } from './middlewares/cors-middleware.js';
import carRouter from './routes/cars-route.js';
import { errorMiddleware } from './middlewares/error-middleware.js';

const port = 3000;
const app = express();
app.use(express.json());

configureCORS(app);

app.use(errorMiddleware);

app.use('/cars', carRouter);

app.use((req: Request, res: Response) => {
    res.status(404).json({
        message: 'Rota não encontrada.'
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});