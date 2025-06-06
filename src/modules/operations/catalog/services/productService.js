import { db } from '../../../../shared/config/database.js';
import { products, productVariants } from '../schema/productSchema.js';
import { eq } from 'drizzle-orm';

export const createProduct = async (data) => {
  const [product] = await db.insert(products).values(data).returning();
  return product;
};

export const getAllProducts = async () => {
  return await db.select().from(products);
};

export const updateProduct = async (id, data) => {
  return await db.update(products).set(data).where(eq(products.product_id, id));
};

export const deleteProduct = async (id) => {
  return await db.delete(products).where(eq(products.product_id, id));
};

export const createProductVariant = async (data) => {
  const [variant] = await db.insert(productVariants).values(data).returning();
  return variant;
};

export const getVariantsByProductId = async (productId) => {
  return await db.select().from(productVariants).where(eq(productVariants.product_id, productId));
};