// services/warehouseService.js
import db from '../config/db.js';

export const createWarehouse = async (data) => {
  const {
    name, code, capacity, address_line, landmark,
    city, state, pin_code, manager_name, manager_phone, created_by
  } = data;

  const sql = `
    INSERT INTO warehouses 
    (name, code, capacity, address_line, landmark, city, state, pin_code, manager_name, manager_phone, created_by) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [name, code, capacity, address_line, landmark, city, state, pin_code, manager_name, manager_phone, created_by];

  await db.query(sql, values);
};

export const getAllWarehouses = async () => {
  const [rows] = await db.query('SELECT * FROM warehouses');
  return rows;
};

export const getWarehouseById = async (id) => {
  const [rows] = await db.query('SELECT * FROM warehouses WHERE warehouse_id = ?', [id]);
  return rows[0];
};

export const updateWarehouse = async (id, data) => {
  const {
    name, code, capacity, address_line, landmark,
    city, state, pin_code, manager_name, manager_phone, updated_by
  } = data;

  const sql = `
    UPDATE warehouses SET 
    name=?, code=?, capacity=?, address_line=?, landmark=?, city=?, state=?, 
    pin_code=?, manager_name=?, manager_phone=?, updated_by=? 
    WHERE warehouse_id=?`;

  const values = [name, code, capacity, address_line, landmark, city, state, pin_code, manager_name, manager_phone, updated_by, id];

  const [result] = await db.query(sql, values);
  return result.affectedRows;
};

export const deleteWarehouse = async (id) => {
  const [result] = await db.query('DELETE FROM warehouses WHERE warehouse_id = ?', [id]);
  return result.affectedRows;
};
