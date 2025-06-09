// Imports
import express from 'express';
// import userRoutes from './src/modules/operations/routes/users.route.js';
import busiexpRoutes from './src/modules/operations/routes/busiexpRoutes.js';
// Variables
const PORT = process.env.PORT || 8000;

const app = express();

// Middlewares
express.json();

// Routes
// app.use('/api/v1/operations/users', userRoutes);
import busiexpRoutes from './src/modules/operations/routes/busiexpRoutes.js';
// Start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
