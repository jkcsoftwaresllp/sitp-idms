import Supplier from '../models/supplier.js';

export const getSuppliers = () => Supplier.findAll();

export const getSupplierById = (id) => Supplier.findByPk(id);

export const addSupplier = (data) => Supplier.create(data);

export const updateSupplier = async (id, data) => {
  const supplier = await Supplier.findByPk(id);
  if (!supplier) return null;
  await supplier.update(data);
  return supplier;
};

export const deleteSupplier = async (id) => {
  const supplier = await Supplier.findByPk(id);
  if (!supplier) return null;
  await supplier.destroy();
  return true;
};
