-- Drop existing tables if they exist
DROP TABLE IF EXISTS `transport_partner`, `supplier`, `organization`, `customers`, `products`, `product_variants`, `users`, `promotional_offers`, `warehouses`, `business_expenses`;

-- Table: transport_partner
CREATE TABLE `transport_partner` (
  `transport_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `business_name` VARCHAR(255),
  `contact_person` VARCHAR(255),
  `phone` VARCHAR(15),
  `alternate_phone` VARCHAR(15),
  `email` VARCHAR(255),
  `address_line` VARCHAR(500),
  `city` VARCHAR(100),
  `state` VARCHAR(100),
  `pin_code` VARCHAR(10),
  `pan_number` VARCHAR(10),
  `gst_number` VARCHAR(15),
  `vehicle_details` JSON,
  `rate_per_km` DECIMAL(8, 2),
  `base_rate` DECIMAL(10, 2),
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` VARCHAR(255) NOT NULL,
  `updated_by` VARCHAR(255)
);

-- Table: supplier
CREATE TABLE `supplier` (
  `supplier_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `business_name` VARCHAR(255),
  `contact_person` VARCHAR(255),
  `phone` VARCHAR(15),
  `alternate_phone` VARCHAR(15),
  `email` VARCHAR(255),
  `gstin` VARCHAR(15),
  `rating` DECIMAL(2, 1) DEFAULT 5.0,
  `address_line` VARCHAR(500),
  `city` VARCHAR(100),
  `state` VARCHAR(100),
  `pin_code` VARCHAR(10),
  `bank_account_number` VARCHAR(50),
  `ifsc_code` VARCHAR(11),
  `upi_id` VARCHAR(255),
  `payment_terms` VARCHAR(255),
  `credit_limit` DECIMAL(12, 2) DEFAULT 0.0,
  `remarks` TEXT,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` VARCHAR(255) NOT NULL,
  `updated_by` VARCHAR(255)
);

-- Table: organization
CREATE TABLE `organization` (
  `organization_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `about` TEXT,
  `tagline` VARCHAR(255),
  `gstin` VARCHAR(15) UNIQUE,
  `logo_url` VARCHAR(500),
  `phone` VARCHAR(15),
  `email` VARCHAR(255) UNIQUE,
  `website` VARCHAR(255),
  `address_line` VARCHAR(500),
  `city` VARCHAR(100),
  `state` VARCHAR(100),
  `country` ENUM('India', 'Other') DEFAULT 'India',
  `pin_code` VARCHAR(10),
  `upi_id` VARCHAR(255),
  `bank_account_number` VARCHAR(50),
  `ifsc_code` VARCHAR(11),
  `bank_branch` VARCHAR(255),
  `fiscal_year_start` DATE NOT NULL,
  `brand_primary_color` VARCHAR(7) DEFAULT '#000000',
  `brand_accent_color` VARCHAR(7) DEFAULT '#0066cc',
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` VARCHAR(255) NOT NULL,
  `updated_by` VARCHAR(255)
);

-- Table: customers
CREATE TABLE `customers` (
  `customer_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `business_name` VARCHAR(255),
  `customer_type` ENUM('individual', 'business') NOT NULL DEFAULT 'individual',
  `phone` VARCHAR(15) NOT NULL,
  `alternate_phone` VARCHAR(15),
  `email` VARCHAR(255),
  `gender` ENUM('male', 'female', 'other', 'prefer_not_to_say') DEFAULT 'prefer_not_to_say',
  `date_of_birth` DATE,
  `gstin` VARCHAR(15),
  `fssai_number` VARCHAR(20),
  `pan_number` VARCHAR(10),
  `aadhar_number` VARCHAR(12),
  `credit_limit` DECIMAL(12, 2) DEFAULT 0.0,
  `outstanding_balance` DECIMAL(12, 2) DEFAULT 0.0,
  `loyalty_points` INT DEFAULT 0,
  `is_blacklisted` BOOLEAN NOT NULL DEFAULT FALSE,
  `blacklist_reason` VARCHAR(255),
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` VARCHAR(255) NOT NULL,
  `updated_by` VARCHAR(255)
);

-- Table: products
CREATE TABLE `products` (
  `product_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `category_id` INT,
  `manufacturer` VARCHAR(255) NOT NULL,
  `brand` VARCHAR(255),
  `dimensions` VARCHAR(100),
  `weight` DECIMAL(10, 3),
  `unit_mrp` DECIMAL(12, 2) NOT NULL,
  `purchase_price` DECIMAL(12, 2) NOT NULL,
  `sale_price` DECIMAL(12, 2) NOT NULL,
  `reorder_level` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` VARCHAR(255) NOT NULL,
  `updated_by` VARCHAR(255)
);

-- Table: product_variants
CREATE TABLE `product_variants` (
  `variant_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT NOT NULL,
  `variant_name` VARCHAR(255) NOT NULL,
  `variant_value` VARCHAR(255) NOT NULL,
  `price_adjustment` DECIMAL(10, 2) DEFAULT 0.0,
  `sku` VARCHAR(100),
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: users
CREATE TABLE `users` (
  `user_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `full_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `phone` VARCHAR(15),
  `role` ENUM('admin', 'operator', 'delivery', 'reporter', 'customer') NOT NULL,
  `avatar_url` VARCHAR(500),
  `password_hash` VARCHAR(255) NOT NULL,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: promotional_offers
CREATE TABLE `promotional_offers` (
  `offer_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL UNIQUE,
  `description` TEXT,
  `offer_type` ENUM('product_discount', 'order_discount', 'buy_x_get_y', 'free_shipping') NOT NULL,
  `discount_value` DECIMAL(10, 2),
  `discount_type` ENUM('fixed', 'percentage') DEFAULT 'percentage',
  `max_discount_amount` DECIMAL(10, 2),
  `min_order_amount` DECIMAL(10, 2),
  `start_date` TIMESTAMP NOT NULL,
  `end_date` TIMESTAMP NOT NULL,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: warehouses
CREATE TABLE `warehouses` (
  `warehouse_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL UNIQUE,
  `code` VARCHAR(20) NOT NULL UNIQUE,
  `capacity` INT,
  `address_line` VARCHAR(500) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(100) NOT NULL,
  `pin_code` VARCHAR(10) NOT NULL,
  `manager_name` VARCHAR(255),
  `manager_phone` VARCHAR(15),
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: business_expenses
CREATE TABLE `business_expenses` (
  `expense_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `category` VARCHAR(100) NOT NULL,
  `subcategory` VARCHAR(100),
  `amount` DECIMAL(12, 2) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `receipt_url` VARCHAR(500),
  `expense_date` DATE NOT NULL,
  `payment_method` ENUM('cash', 'card', 'upi', 'net_banking'),
  `is_recurring` BOOLEAN NOT NULL DEFAULT FALSE,
  `recurrence_pattern` VARCHAR(100),
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` VARCHAR(255) NOT NULL,
  `updated_by` VARCHAR(255)
);
