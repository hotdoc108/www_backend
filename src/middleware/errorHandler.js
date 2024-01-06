import { isHttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let errorMessage = 'Server Error';
    if (isHttpError(err)) {
        statusCode = err.status;
        errorMessage = err.message;
    }
    res.status(statusCode).json({ status: 'failed', message: errorMessage });
};