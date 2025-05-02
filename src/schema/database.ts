
/**
 * This file contains TypeScript interfaces that represent the database schema
 * for the online store. These are not actual database tables, but rather a
 * representation of what the database structure would look like.
 */

// Products Table
export interface Product {
  id: string;              // Unique identifier
  name: string;            // Product name
  price: number;           // Current price
  oldPrice: number | null; // Previous price for discount calculation
  stock: number;           // Available quantity
  colors: string[];        // Available colors
  sizes: string[];         // Available sizes
  shortDescription: string;// Brief product description
  longDescription: string; // Detailed product description
  images: string[];        // Array of image URLs
  categoryId: string;      // Foreign key to Categories table
  createdAt: Date;         // Creation timestamp
  updatedAt: Date;         // Last update timestamp
}

// Orders Table
export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED'
}

export interface Order {
  id: string;              // Unique identifier
  productId: string;       // Foreign key to Products table
  date: Date;              // Order date
  status: OrderStatus;     // Current order status
  customerId: string;      // Foreign key to Customers table
  customerName: string;    // Customer name (denormalized for quick access)
  customerPhone: string;   // Customer phone (denormalized for quick access)
  wilaya: string;          // Province/state
  commune: string;         // City/municipality
  address: string;         // Detailed address
  quantity: number;        // Number of items ordered
  price: number;           // Price at time of order (may differ from current product price)
  notes: string | null;    // Additional notes or observations
  createdAt: Date;         // Creation timestamp
  updatedAt: Date;         // Last update timestamp
}

// Order Status History (for tracking status changes)
export interface OrderStatusHistory {
  id: string;              // Unique identifier
  orderId: string;         // Foreign key to Orders table
  status: OrderStatus;     // Status at this point
  timestamp: Date;         // When the status changed
  notes: string | null;    // Optional notes about the status change
}

// Customers Table
export interface Customer {
  id: string;              // Unique identifier
  name: string;            // Full name
  phoneNumber: string;     // Contact phone number
  wilaya: string;          // Province/state
  commune: string;         // City/municipality
  address: string;         // Detailed address
  createdAt: Date;         // Creation timestamp
  updatedAt: Date;         // Last update timestamp
  
  // These would be calculated fields, not stored directly
  // numberOfOrders: number;   
  // orderedProducts: Product[];
}

// Categories Table
export interface Category {
  id: string;              // Unique identifier
  name: string;            // Category name
  description: string | null; // Optional description
  image: string | null;    // Category image URL
  createdAt: Date;         // Creation timestamp
  updatedAt: Date;         // Last update timestamp
}

// Statistics (These would be calculated from the other tables, not stored directly)
export interface Statistics {
  totalOrders: number;
  confirmedOrders: number;
  deliveredOrders: number;
  totalRevenue: number;
  deliveredRevenue: number;
  ordersByProduct: Record<string, number>; // Map of productId -> order count
  ordersByCategory: Record<string, number>; // Map of categoryId -> order count
  averageRevenuePerCustomer: number;
  bestSellingProducts: Array<{productId: string, count: number}>;
  bestCustomers: Array<{customerId: string, orders: number, revenue: number}>;
}

/**
 * Database Design Notes:
 * 
 * 1. Normalization: The schema follows 3NF (Third Normal Form) to reduce data redundancy.
 * 
 * 2. Relations:
 *    - Orders reference Products and Customers through their IDs
 *    - Products reference Categories through categoryId
 *    - Order status history maintains a log of all status changes
 * 
 * 3. Stock Management:
 *    When an order is placed, the application should decrease the stock
 *    of the corresponding product by the ordered quantity.
 * 
 * 4. Timestamps:
 *    All tables include createdAt and updatedAt fields for tracking.
 * 
 * 5. Security:
 *    - All inputs should be sanitized before insertion
 *    - Access control should be implemented to protect sensitive data
 * 
 * 6. Performance Considerations:
 *    - Indexes should be created on frequently queried fields like:
 *      * product.categoryId
 *      * order.customerId
 *      * order.productId
 *      * order.status
 *    - Consider adding composite indexes for common query patterns
 * 
 * 7. Statistics:
 *    Rather than maintaining a separate statistics table, most statistics
 *    would be calculated on-demand using queries against the core tables.
 *    For performance, some pre-calculated statistics could be cached.
 */
