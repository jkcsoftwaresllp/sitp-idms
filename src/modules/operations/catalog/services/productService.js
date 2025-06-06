import { eq, desc } from 'drizzle-orm';
import { db } from '../../../../shared/config/database.js';
import { products } from '../../../../shared/schema/index.js';

export const getAllProducts = async () => {
  return await db.select().from(products).orderBy(desc(products.created_at));
};

export const getProductById = async (id) => {
  const [product] = await db.select().from(products).where(eq(products.product_id, id));
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

export const createProduct = async (productData) => {
  const [product] = await db.insert(products).values({
    ...productData,
    created_by: productData.created_by || null,
    updated_by: productData.created_by || null
  }).returning();
  
  return product;
};

export const updateProduct = async (id, productData) => {
  const [updatedProduct] = await db
    .update(products)
    .set({
      ...productData,
      updated_by: productData.updated_by || null,
      updated_at: new Date()
    })
    .where(eq(products.product_id, id))
    .returning();

  if (!updatedProduct) {
    throw new Error('Product not found');
  }
  
  return updatedProduct;
};

export const deleteProduct = async (id) => {
  const result = await db.delete(products).where(eq(products.product_id, id));
  if (result.affectedRows === 0) {
    throw new Error('Product not found');
  }
  return { message: 'Product deleted successfully' };
};