import express from 'express';
import * as productVariantController from '../modules/operations/catalog/controllers/productVariantController.js';
import { authenticateToken } from '../shared/middleware/auth.js';

const router = express.Router();

// All variant routes require authentication
router.use(authenticateToken);

router.get('/', productVariantController.getAllVariants);
router.get('/product/:productId', productVariantController.getVariantsByProductId);
router.get('/:id', productVariantController.getVariantById);
router.post('/', productVariantController.createVariant);
router.put('/:id', productVariantController.updateVariant);
router.delete('/:id', productVariantController.deleteVariant);

export default router;