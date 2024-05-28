import express from 'express';
import signUpRouter from './api/signup'; // Import the router, not the entire module

export const routes = function (app: express.Application): void {
    app.use('/api/user', signUpRouter); // Use the router
}