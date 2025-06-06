// Imports
import express from 'express';
// import userRoutes from './src/modules/operations/routes/users.route.js';
import  customerRoutes from './src/modules/operations/routes/customerRoutes.js';
// Variables
const PORT = process.env.PORT || 8000;

const app = express();

// Middlewares
express.json();

// Routes
// app.use('/api/v1/operations/users', userRoutes);
app.use('/api/customers', customerRoutes);
// Start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
