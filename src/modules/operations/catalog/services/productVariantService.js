import { eq, desc } from 'drizzle-orm';
import { db } from '../../../../shared/config/database.js';
import { productVariants } from '../../../../shared/schema/index.js';

export const getAllVariants = async () => {
  return await db.select().from(productVariants).orderBy(desc(productVariants.created_at));
};

export const getVariantsByProductId = async (productId) => {
  return await db.select().from(productVariants).where(eq(productVariants.product_id, productId));
};

export const getVariantById = async (id) => {
  const [variant] = await db.select().from(productVariants).where(eq(productVariants.variant_id, id));
  if (!variant) {
    throw new Error('Product variant not found');
  }
  return variant;
};

export const createVariant = async (variantData) => {
  const [variant] = await db.insert(productVariants).values(variantData).returning();
  return variant;
};

export const updateVariant = async (id, variantData) => {
  const [updatedVariant] = await db
    .update(productVariants)
    .set(variantData)
    .where(eq(productVariants.variant_id, id))
    .returning();

  if (!updatedVariant) {
    throw new Error('Product variant not found');
  }
  
  return updatedVariant;
};

export const deleteVariant = async (id) => {
  const result = await db.delete(productVariants).where(eq(productVariants.variant_id, id));
  if (result.affectedRows === 0) {
    throw new Error('Product variant not found');
  }
  return { message: 'Product variant deleted successfully' };
};

// ===== src/modules/operations/catalog/controllers/productController.js =====
import * as productService from '../services/productService.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(parseInt(req.params.id));
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      created_by: req.user.id
    };
    const product = await productService.createProduct(productData);
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      updated_by: req.user.id
    };
    const product = await productService.updateProduct(parseInt(req.params.id), productData);
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const result = await productService.deleteProduct(parseInt(req.params.id));
    res.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};