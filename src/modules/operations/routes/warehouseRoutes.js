// routes/warehouseRoutes.js
import express from 'express';
import * as warehouseController from '../controllers/warehouseController.js';

const router = express.Router();

router.post('/', warehouseController.createWarehouse);
router.get('/', warehouseController.getAllWarehouses);
router.get('/:id', warehouseController.getWarehouseById);
router.put('/:id', warehouseController.updateWarehouse);
router.delete('/:id', warehouseController.deleteWarehouse);

export default router;
