# Architecture Documentation

## Overview

This inventory management system is built using a **Domain-Driven Design (DDD)** approach with a modular architecture. The system is organized into business domains that encapsulate related functionality, promoting maintainability, scalability, and clear separation of concerns.

## Core Principles

### 1. Domain-Driven Design

- **Modules represent business domains** (operations, sales, analytics)
- **Each module is self-contained** with its own controllers, services, and schemas
- **Business logic is encapsulated** within appropriate domain boundaries
- **Cross-cutting concerns** are handled in shared utilities

### 2. Layered Architecture

Each module follows a flexible layered pattern:

- **Controllers**: Handle HTTP requests, validation, and response formatting
- **Services**: Contain business logic and simple database interactions
- **Repositories**: Handle complex queries and advanced database operations (introduced only when needed)
- **Schema**: Define data models and database structure using Drizzle ORM

### 3. Database-First Approach

- **Drizzle ORM** for type-safe database operations
- **Schema-driven development** with centralized schema exports
- **Direct database access** in service layer (no additional repository abstraction)

## Directory Structure

```noscript
src/
├── modules/                  # Business domain modules
│   ├── operations/           # Operational business logic
│   │   ├── catalog/          # Product catalog management
│   │   │   ├── controllers/  # HTTP request handlers
│   │   │   ├── services/     # Business logic + simple DB operations
│   │   │   ├── repositories/ # Complex queries (only when needed)
│   │   │   └── schema/       # Drizzle schema definitions
│   │   ├── inventory/        # Stock and warehouse management
│   │   └── customers/        # Customer relationship management
│   │
│   ├── sales/                # Sales and order management
│   │   └── .../
│   │
│   └── analytics/            # Reports and analytics
│       └── .../       
│
├── shared/                   # Cross-cutting concerns
│   ├── config/               # Configuration management
│   │   └── database.js       # Drizzle DB instance
│   ├── schema/               # Centralized schema exports
│   │   └── index.js          # Re-export all domain schemas
│   ├── utils/                # Common utilities
│   │   └── queryHelpers.js   # Reusable query patterns
│   ├── middleware/           # Express middleware
│   └── validators/           # Input validation schemas
│
└── app.js                    # Application entry point
```

```noscript
HTTP Request → Route → Controller Function → Service Function → Repository Function → Database
```

## Module Architecture

### Controller Layer

**Responsibility**: HTTP request/response handling, input validation, error handling

```javascript
// Example: productController.js
export const createProduct = async (req, res, next) => {
  try {
    const validatedData = validateProductInput(req.body);
    const product = await productService.createProduct(validatedData);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};
```

**Key Principles**:

- Thin controllers - delegate business logic to services
- Consistent error handling and response formatting
- Input validation before passing to services
- No direct database access

### Service Layer

**Responsibility**: Business logic, data validation, database operations

```javascript
// Example: productService.js
import { db } from '../../shared/config/database.js';
import { products } from './schema/productSchema.js';

export const createProduct = async (productData) => {
  // Business logic validation
  if (await isProductCodeExists(productData.code)) {
    throw new Error('Product code already exists');
  }
  
  // Database operation
  const [product] = await db.insert(products)
    .values(productData)
    .returning();
    
  return product;
};
```

**Key Principles**:

- Contains all business logic and rules
- Direct Drizzle ORM usage for simple database operations
- **Complex queries are delegated to repository layer** (see Repository Pattern below)
- Handles data transformation and validation
- Throws meaningful business exceptions

### Repository Layer (For Complex Queries)

**Responsibility**: Advanced database operations, complex queries, and data access patterns

**Note**: The repository layer is **only introduced when dealing with complex queries**. Simple CRUD operations remain directly in the service layer for simplicity.

```js
// Example: productRepository.js (only when complex queries are needed)
import { db } from '../../../shared/config/database.js';
import { products, categories, suppliers } from '../schema/productSchema.js';
import { eq, and, gte, lte, desc } from 'drizzle-orm';

export const findProductsWithComplexFilters = async (filters) => {
  return await db
    .select({
      id: products.id,
      name: products.name,
      categoryName: categories.name,
      supplierName: suppliers.name,
      stockLevel: products.stockLevel
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(suppliers, eq(products.supplierId, suppliers.id))
    .where(
      and(
        filters.categoryId ? eq(products.categoryId, filters.categoryId),
        filters.minPrice ? gte(products.price, filters.minPrice),
        filters.maxPrice ? lte(products.price, filters.maxPrice),
        filters.inStock ? gte(products.stockLevel, 1)
      )
    )
    .orderBy(desc(products.createdAt))
    .limit(filters.limit || 50)
    .offset(filters.offset || 0);
};
```

**When to Use Repository Layer**:

- Multi-table joins with complex conditions
- Aggregation queries and reporting
- Advanced filtering and search operations
- Bulk operations with complex business rules
- Performance-critical queries requiring optimization

### Schema Layer

**Responsibility**: Database schema definition and type safety

```javascript
// Example: productSchema.js
import { mysqlTable, serial, varchar, decimal, timestamp } from 'drizzle-orm/mysql-core';

export const products = mysqlTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  price: decimal('price', { precision: 10, scale: 2 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});
```

**Key Principles**:

- Single source of truth for database structure
- Type-safe database operations
- Centralized schema exports for cross-module usage
- Migration-friendly schema definitions

## Shared Layer

### Database Configuration

**File**: `shared/config/database.js`

- Centralized Drizzle database instance
- Connection pooling and configuration
- Environment-specific settings

### Schema Index

**File**: `shared/schema/index.js`

- Re-exports all domain schemas
- Enables cross-module relationships
- Simplifies import statements

### Query Helpers

**File**: `shared/utils/queryHelpers.js`

- Common query patterns and utilities
- Reusable database operations
- Pagination, filtering, and sorting helpers

## Data Flow

### Request Lifecycle

1. **HTTP Request** → Controller
2. **Input Validation** → Controller validates and sanitizes input
3. **Business Logic** → Service processes business rules
4. **Database Operations** → Service executes Drizzle queries
5. **Response Formatting** → Controller formats and returns response

### Cross-Module Communication

- **Direct service imports** for cross-domain operations
- **Shared schema exports** for relationship definitions
- **Event-driven patterns** for loose coupling (where appropriate)

## Database Strategy

### Drizzle ORM Benefits

- **Type Safety**: Compile-time type checking for queries
- **Performance**: Direct SQL generation without heavy abstractions
- **Flexibility**: Full SQL capabilities with TypeScript benefits
- **Migration Support**: Schema-driven database evolution

### Query Patterns

```javascript
// Simple CRUD operations
const product = await db.select().from(products).where(eq(products.id, id));

// Complex queries with joins
const ordersWithItems = await db
  .select()
  .from(orders)
  .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
  .where(eq(orders.customerId, customerId));

// Transactions for data consistency
await db.transaction(async (tx) => {
  await tx.insert(orders).values(orderData);
  await tx.insert(orderItems).values(itemsData);
});
```

## Error Handling Strategy

### Layered Error Handling

- **Controller Layer**: HTTP-specific error handling and response formatting
- **Service Layer**: Business logic errors and validation failures
- **Database Layer**: Connection and query errors

### Error Types

- **ValidationError**: Input validation failures
- **BusinessError**: Business rule violations
- **DatabaseError**: Database operation failures
- **AuthenticationError**: Authentication and authorization failures

## Security Considerations

### Authentication & Authorization

- **JWT-based authentication** for stateless sessions
- **Role-Based Access Control (RBAC)** for fine-grained permissions
- **Module-level authorization** checks in controllers

## Testing Strategy

### Unit Testing

- **Service layer testing**: Focus on business logic
- **Controller testing**: HTTP request/response handling
- **Schema testing**: Database operations and constraints

### Integration Testing

- **Module integration**: Cross-module communication
- **Database integration**: Real database operations
- **API integration**: End-to-end request flows

---


