import { Router } from 'express';
import * as controller from '../controllers/productController.js';
import { authenticate } from '../../../../shared/middleware/authMiddleware.js';

const router = Router();

router.get('/', authenticate, controller.listProducts);
router.post('/', authenticate, controller.createProduct);
router.put('/:id', authenticate, controller.updateProduct);
router.delete('/:id', authenticate, controller.deleteProduct);

router.post('/:productId/variants', authenticate, controller.createVariant);
router.get('/:productId/variants', authenticate, controller.listVariants);

export default router;