import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// 404 handler
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.statusCode = 404;
    next(error);
});

// Global error handler
app.use(errorMiddleware);

export default app;
