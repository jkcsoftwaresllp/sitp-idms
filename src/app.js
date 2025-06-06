import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './modules/operations/catalog/routes/productRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
