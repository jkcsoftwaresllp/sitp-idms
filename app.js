// Imports
import express from 'express';
import warehouseRoutes from './routes/warehouseRoutes.js';

// Variables
const PORT = process.env.PORT || 8000;

const app = express();

// Middlewares
express.json();

// Routes
app.use('/api/warehouses', warehouseRoutes);
// Start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
