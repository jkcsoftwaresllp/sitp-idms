import * as service from '../services/supplierService.js';

export const fetchSuppliers = async (req, res, next) => {
  try {
    const data = await service.getSuppliers();
    res.json(data);
  } catch (e) { next(e); }
};

export const getSupplierById = async (req, res, next) => {
  try {
    const supplier = await service.getSupplierById(req.params.id);
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
    res.json(supplier);
  } catch (e) { next(e); }
};

export const createSupplier = async (req, res, next) => {
  try {
    const newSupplier = await service.addSupplier(req.body);
    res.status(201).json(newSupplier);
  } catch (e) { next(e); }
};

export const updateSupplier = async (req, res, next) => {
  try {
    const updated = await service.updateSupplier(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Supplier not found' });
    res.json(updated);
  } catch (e) { next(e); }
};

export const deleteSupplier = async (req, res, next) => {
  try {
    const deleted = await service.deleteSupplier(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Supplier not found' });
    res.json({ message: 'Supplier deleted' });
  } catch (e) { next(e); }
};
