// controllers/warehouseController.js
import * as warehouseService from '../services/warehouseService.js';

export const createWarehouse = async (req, res) => {
  try {
    await warehouseService.createWarehouse(req.body);
    res.status(201).json({ message: 'Warehouse created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await warehouseService.getAllWarehouses();
    res.json(warehouses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWarehouseById = async (req, res) => {
  try {
    const warehouse = await warehouseService.getWarehouseById(req.params.id);
    if (!warehouse) return res.status(404).json({ message: 'Warehouse not found' });
    res.json(warehouse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateWarehouse = async (req, res) => {
  try {
    const updated = await warehouseService.updateWarehouse(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Warehouse not found' });
    res.json({ message: 'Warehouse updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteWarehouse = async (req, res) => {
  try {
    const deleted = await warehouseService.deleteWarehouse(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Warehouse not found' });
    res.json({ message: 'Warehouse deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
