import express from 'express';
import {
    addExpense,
    fetchAllExpenses,
    fetchExpenseById,
    modifyExpense,
    removeExpense
} from '../controllers/busiexpController.js';

const router = express.Router();

router.post('/', addExpense);
router.get('/', fetchAllExpenses);
router.get('/:id', fetchExpenseById);
router.put('/:id', modifyExpense);
router.delete('/:id', removeExpense);

export default router;