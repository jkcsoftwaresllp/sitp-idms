import db from '../../../config/db.js';

export const createExpense = (data, callback) => {
    const sql = `INSERT INTO business_expenses SET ?`;
    db.query(sql, data, callback);
};

export const getAllExpenses = (callback) => {
    const sql = `SELECT * FROM business_expenses WHERE is_active = true`;
    db.query(sql, callback);
};

export const getExpenseById = (id, callback) => {
    const sql = `SELECT * FROM business_expenses WHERE id = ?`;
    db.query(sql, [id], callback);
};

export const updateExpense = (data, id, callback) => {
    const sql = `UPDATE business_expenses SET ? WHERE id = ?`;
    db.query(sql, [data, id], callback);
};

export const deleteExpense = (id, callback) => {
    const sql = `UPDATE business_expenses SET is_active = false WHERE id = ?`;
    db.query(sql, [id], callback);
};