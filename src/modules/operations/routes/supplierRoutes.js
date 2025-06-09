import express from 'express';
import {
  fetchSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSupplierById
} from '../controllers/supplierController.js';

const router = express.Router();

router.get('/', fetchSuppliers);         
router.get('/:id', getSupplierById);     
router.post('/', createSupplier);         
router.put('/:id', updateSupplier);       
router.delete('/:id', deleteSupplier);    

export default router;
