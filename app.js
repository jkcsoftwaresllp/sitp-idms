// Imports
import express from 'express';
import supplierRoutes from require('./routes/supplierRoutes');

// Variables
const PORT = process.env.PORT || 8000;

const app = express();

// Middlewares
express.json();

// Routes
app.use('/api/suppliers', supplierRoutes);

// Start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
