// Imports
import express from 'express';
import  organizationRoutes from './src/modules/operations/routes/organizationRoutes.js';

// Variables
const PORT = process.env.PORT || 8000;

const app = express();

// Middlewares
express.json();

// Routes
 app.use('/api/v1/operations/organizations',organizationRoutes );

// Start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
