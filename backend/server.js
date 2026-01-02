import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path'; // Ensure path is imported
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// Get the Paybal/Stripe config
app.get('/api/config/stripe', (req, res) =>
  res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY })
);

// -------------------------------------------------------------------------
// DEPLOYMENT CONFIGURATION STARTS HERE
// -------------------------------------------------------------------------

const __dirname = path.resolve();

// Serve static uploads (Note: Local uploads disappear on Vercel after server restart!)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  // Point to frontend/dist (Vite builds to 'dist')
  app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

  // Any route that is not an API route will be redirected to index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

app.use(notFound);
app.use(errorHandler);

// -------------------------------------------------------------------------
// VERCEL SERVERLESS CONFIGURATION
// -------------------------------------------------------------------------

// Only listen to port if we are NOT in production (i.e., local development)
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => console.log(`Server running on port ${port}`));
}

// Export the app for Vercel
export default app;