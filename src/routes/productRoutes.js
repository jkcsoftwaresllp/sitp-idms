import express from 'express';
import * as productController from '../modules/operations/catalog/controllers/productController.js';
import { authenticateToken } from '../shared/middleware/auth.js';

const router = express.Router();

// All product routes require authentication
router.use(authenticateToken);

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;