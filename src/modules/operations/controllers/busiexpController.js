import {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
} from '../services/busiexpService.js';

export const addExpense = (req, res) => {
    const data = req.body;
    createExpense(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Expense added", data: result });
    });
};

export const fetchAllExpenses = (req, res) => {
    getAllExpenses((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

export const fetchExpenseById = (req, res) => {
    const id = req.params.id;
    getExpenseById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Not found" });
        res.json(results[0]);
    });
};

export const modifyExpense = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    updateExpense(data, id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: "Not found" });
        res.json({ message: "Updated", data: results });
    });
};

export const removeExpense = (req, res) => {
    const id = req.params.id;
    deleteExpense(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: "Not found or already deleted" });
        res.json({ message: "Deleted (soft)", data: results });
    });
};