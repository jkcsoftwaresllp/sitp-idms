import { mysqlTable, int, varchar, text, decimal, timestamp, tinyint } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  role: varchar('role', { length: 50 }),
  phone: varchar('phone', { length: 20 }),
  password: varchar('password', { length: 255 }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
});

export const products = mysqlTable('products', {
  product_id: int('product_id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }),
  description: text('description'),
  category_id: int('category_id'),
  manufacturer: varchar('manufacturer', { length: 255 }),
  brand: varchar('brand', { length: 255 }),
  dimensions: varchar('dimensions', { length: 100 }),
  weight: decimal('weight', { precision: 10, scale: 3 }),
  unit_mrp: decimal('unit_mrp', { precision: 12, scale: 2 }),
  purchase_price: decimal('purchase_price', { precision: 12, scale: 2 }),
  sale_price: decimal('sale_price', { precision: 12, scale: 2 }),
  loading_charge: decimal('loading_charge', { precision: 10, scale: 2 }),
  unloading_charge: decimal('unloading_charge', { precision: 10, scale: 2 }),
  reorder_level: int('reorder_level'),
  cgst_rate: decimal('cgst_rate', { precision: 5, scale: 2 }),
  sgst_rate: decimal('sgst_rate', { precision: 5, scale: 2 }),
  cess_rate: decimal('cess_rate', { precision: 5, scale: 2 }),
  upc: varchar('upc', { length: 50 }),
  hsn_code: varchar('hsn_code', { length: 20 }),
  pack_size: int('pack_size'),
  has_variants: tinyint('has_variants'),
  is_active: tinyint('is_active').default(1),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
  created_by: int('created_by'),
  updated_by: int('updated_by'),
});

export const productVariants = mysqlTable('product_variants', {
  variant_id: int('variant_id').primaryKey().autoincrement(),
  product_id: int('product_id'),
  variant_name: varchar('variant_name', { length: 255 }),
  variant_value: varchar('variant_value', { length: 255 }),
  price_adjustment: decimal('price_adjustment', { precision: 10, scale: 2 }),
  sku: varchar('sku', { length: 100 }),
  is_active: tinyint('is_active').default(1),
  created_at: timestamp('created_at').defaultNow(),
});