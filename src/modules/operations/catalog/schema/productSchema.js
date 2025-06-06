import {
  mysqlTable, serial, varchar, decimal, boolean, timestamp, int
} from 'drizzle-orm/mysql-core';

export const products = mysqlTable('products', {
  product_id: serial('product_id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 500 }),
  category_id: int('category_id'),
  manufacturer: varchar('manufacturer', { length: 255 }),
  brand: varchar('brand', { length: 255 }),
  unit_mrp: decimal('unit_mrp', { precision: 12, scale: 2 }),
  purchase_price: decimal('purchase_price', { precision: 12, scale: 2 }),
  sale_price: decimal('sale_price', { precision: 12, scale: 2 }),
  has_variants: boolean('has_variants').default(false),
  is_active: boolean('is_active').default(true),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const productVariants = mysqlTable('product_variants', {
  variant_id: serial('variant_id').primaryKey(),
  product_id: int('product_id').notNull(),
  variant_name: varchar('variant_name', { length: 255 }).notNull(),
  variant_value: varchar('variant_value', { length: 255 }).notNull(),
  price_adjustment: decimal('price_adjustment', { precision: 10, scale: 2 }),
  sku: varchar('sku', { length: 100 }),
  is_active: boolean('is_active').default(true),
  created_at: timestamp('created_at').defaultNow(),
});