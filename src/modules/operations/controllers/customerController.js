import db from '../config/db.js';

export const createCustomer = (req, res) => {
    const data = req.body;
    const sql = `INSERT INTO customers SET ?`;
    db.query(sql, data, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Customer created", data: results });
    });
};

export const getAllCustomers = (req, res) => {
    const sql = `SELECT * FROM customers WHERE is_active = true`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

export const getCustomerById = (req, res) => {
    const sql = `SELECT * FROM customers WHERE id = ?`;
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.json(results[0]);
    });
};

export const updateCustomer = (req, res) => {
    const sql = `UPDATE customers SET ? WHERE id = ?`;
    db.query(sql, [req.body, req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Customer not found or nothing to update" });
        }
        res.json({ message: "Customer updated", data: results });
    });
};

export const deleteCustomer = (req, res) => {
    const sql = `UPDATE customers SET is_active = false WHERE id = ?`;
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Customer not found or already inactive" });
        }
        res.json({ message: "Customer deleted (soft)", data: results });
    });
};
