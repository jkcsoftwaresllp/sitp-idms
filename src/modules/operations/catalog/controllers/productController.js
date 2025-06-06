import * as service from '../services/productService.js';

export const createProduct = async (req, res, next) => {
  try {
    const product = await service.createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const listProducts = async (_req, res, next) => {
  try {
    const products = await service.getAllProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    await service.updateProduct(req.params.id, req.body);
    res.json({ message: 'Product updated' });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await service.deleteProduct(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};

export const createVariant = async (req, res, next) => {
  try {
    const variant = await service.createProductVariant(req.body);
    res.status(201).json(variant);
  } catch (err) {
    next(err);
  }
};

export const listVariants = async (req, res, next) => {
  try {
    const variants = await service.getVariantsByProductId(req.params.productId);
    res.json(variants);
  } catch (err) {
    next(err);
  }
};
