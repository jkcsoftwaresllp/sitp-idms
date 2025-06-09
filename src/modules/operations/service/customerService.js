import db from '../../config/db.js';

export const createCustomerService = (data, callback) => {
    const sql = `INSERT INTO customers SET ?`;
    db.query(sql, data, callback);
};

export const getAllCustomersService = (callback) => {
    const sql = `SELECT * FROM customers WHERE is_active = true`;
    db.query(sql, callback);
};

export const getCustomerByIdService = (id, callback) => {
    const sql = `SELECT * FROM customers WHERE id = ?`;
    db.query(sql, [id], callback);
};

export const updateCustomerService = (id, data, callback) => {
    const sql = `UPDATE customers SET ? WHERE id = ?`;
    db.query(sql, [data, id], callback);
};

export const deleteCustomerService = (id, callback) => {
    const sql = `UPDATE customers SET is_active = false WHERE id = ?`;
    db.query(sql, [id], callback);
};
