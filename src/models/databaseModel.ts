
import { Product, Order, Customer, Category, OrderStatus } from '../schema/database';

/**
 * This file contains mock implementations of database operations
 * In a real application, these would be replaced with actual database calls
 * (e.g., to Supabase, Firebase, or another backend)
 */

// Mock data storage
let products: Product[] = [];
let orders: Order[] = [];
let customers: Customer[] = [];
let categories: Category[] = [];

// Products
export const productModel = {
  // Create a new product
  create: (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: `prod_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    products.push(newProduct);
    return newProduct;
  },
  
  // Get all products
  getAll: (): Product[] => {
    return [...products];
  },
  
  // Get a product by ID
  getById: (id: string): Product | undefined => {
    return products.find(product => product.id === id);
  },
  
  // Get products by category
  getByCategory: (categoryId: string): Product[] => {
    return products.filter(product => product.categoryId === categoryId);
  },
  
  // Update a product
  update: (id: string, updates: Partial<Product>): Product | undefined => {
    const index = products.findIndex(product => product.id === id);
    if (index === -1) return undefined;
    
    products[index] = {
      ...products[index],
      ...updates,
      updatedAt: new Date()
    };
    
    return products[index];
  },
  
  // Delete a product
  delete: (id: string): boolean => {
    const initialLength = products.length;
    products = products.filter(product => product.id !== id);
    return products.length < initialLength;
  },
  
  // Update stock when order is placed
  updateStock: (productId: string, quantity: number): boolean => {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock < quantity) return false;
    
    product.stock -= quantity;
    product.updatedAt = new Date();
    return true;
  }
};

// Orders
export const orderModel = {
  // Create a new order
  create: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order | null => {
    // Check product availability
    const product = productModel.getById(orderData.productId);
    if (!product || product.stock < orderData.quantity) return null;
    
    // Update stock
    productModel.updateStock(orderData.productId, orderData.quantity);
    
    // Create order
    const newOrder: Order = {
      ...orderData,
      id: `order_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    orders.push(newOrder);
    return newOrder;
  },
  
  // Get all orders
  getAll: (): Order[] => {
    return [...orders];
  },
  
  // Get order by ID
  getById: (id: string): Order | undefined => {
    return orders.find(order => order.id === id);
  },
  
  // Get orders by customer
  getByCustomer: (customerId: string): Order[] => {
    return orders.filter(order => order.customerId === customerId);
  },
  
  // Get orders by status
  getByStatus: (status: OrderStatus): Order[] => {
    return orders.filter(order => order.status === status);
  },
  
  // Update order status
  updateStatus: (id: string, status: OrderStatus, notes?: string): Order | undefined => {
    const order = orders.find(order => order.id === id);
    if (!order) return undefined;
    
    order.status = status;
    order.updatedAt = new Date();
    if (notes) order.notes = notes;
    
    // In a real implementation, we would also add an entry to the order status history
    
    return order;
  },
  
  // Delete an order (typically just marked as canceled, not actually deleted)
  cancel: (id: string): boolean => {
    const order = orders.find(order => order.id === id);
    if (!order) return false;
    
    order.status = OrderStatus.CANCELED;
    order.updatedAt = new Date();
    return true;
  }
};

// Customers
export const customerModel = {
  // Create a new customer
  create: (customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Customer => {
    const newCustomer: Customer = {
      ...customerData,
      id: `cust_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    customers.push(newCustomer);
    return newCustomer;
  },
  
  // Get all customers
  getAll: (): Customer[] => {
    return [...customers];
  },
  
  // Get customer by ID
  getById: (id: string): Customer | undefined => {
    return customers.find(customer => customer.id === id);
  },
  
  // Get customer by phone number
  getByPhone: (phoneNumber: string): Customer | undefined => {
    return customers.find(customer => customer.phoneNumber === phoneNumber);
  },
  
  // Update customer information
  update: (id: string, updates: Partial<Customer>): Customer | undefined => {
    const index = customers.findIndex(customer => customer.id === id);
    if (index === -1) return undefined;
    
    customers[index] = {
      ...customers[index],
      ...updates,
      updatedAt: new Date()
    };
    
    return customers[index];
  },
  
  // Get customer statistics
  getStatistics: (customerId: string) => {
    const customerOrders = orderModel.getByCustomer(customerId);
    
    const totalOrders = customerOrders.length;
    const totalSpent = customerOrders.reduce((sum, order) => sum + order.price * order.quantity, 0);
    
    const orderedProducts = customerOrders.map(order => ({
      orderId: order.id,
      productId: order.productId,
      quantity: order.quantity,
      price: order.price,
      date: order.date,
      status: order.status
    }));
    
    return {
      totalOrders,
      totalSpent,
      orderedProducts
    };
  }
};

// Categories
export const categoryModel = {
  // Create a new category
  create: (categoryData: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Category => {
    const newCategory: Category = {
      ...categoryData,
      id: `cat_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    categories.push(newCategory);
    return newCategory;
  },
  
  // Get all categories
  getAll: (): Category[] => {
    return [...categories];
  },
  
  // Get category by ID
  getById: (id: string): Category | undefined => {
    return categories.find(category => category.id === id);
  },
  
  // Update category
  update: (id: string, updates: Partial<Category>): Category | undefined => {
    const index = categories.findIndex(category => category.id === id);
    if (index === -1) return undefined;
    
    categories[index] = {
      ...categories[index],
      ...updates,
      updatedAt: new Date()
    };
    
    return categories[index];
  },
  
  // Delete category
  delete: (id: string): boolean => {
    const initialLength = categories.length;
    categories = categories.filter(category => category.id !== id);
    return categories.length < initialLength;
  }
};

// Statistics functions
export const statisticsModel = {
  // Calculate overall statistics
  getOverallStatistics: () => {
    const totalOrders = orders.length;
    const confirmedOrders = orders.filter(order => order.status === OrderStatus.CONFIRMED).length;
    const deliveredOrders = orders.filter(order => order.status === OrderStatus.DELIVERED).length;
    
    const totalRevenue = orders.reduce((sum, order) => sum + order.price * order.quantity, 0);
    const deliveredRevenue = orders
      .filter(order => order.status === OrderStatus.DELIVERED)
      .reduce((sum, order) => sum + order.price * order.quantity, 0);
    
    // Count orders by product
    const ordersByProduct: Record<string, number> = {};
    orders.forEach(order => {
      ordersByProduct[order.productId] = (ordersByProduct[order.productId] || 0) + 1;
    });
    
    // Count orders by category
    const ordersByCategory: Record<string, number> = {};
    orders.forEach(order => {
      const product = productModel.getById(order.productId);
      if (product) {
        ordersByCategory[product.categoryId] = (ordersByCategory[product.categoryId] || 0) + 1;
      }
    });
    
    // Calculate average revenue per customer
    let averageRevenuePerCustomer = 0;
    if (customers.length > 0) {
      const totalCustomerRevenue = customers.reduce((sum, customer) => {
        const customerOrders = orderModel.getByCustomer(customer.id);
        const customerRevenue = customerOrders.reduce(
          (orderSum, order) => orderSum + order.price * order.quantity, 
          0
        );
        return sum + customerRevenue;
      }, 0);
      
      averageRevenuePerCustomer = totalCustomerRevenue / customers.length;
    }
    
    // Find best selling products
    const bestSellingProducts = Object.entries(ordersByProduct)
      .map(([productId, count]) => ({ productId, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10
    
    // Find best customers
    const customerStats = customers.map(customer => {
      const customerOrders = orderModel.getByCustomer(customer.id);
      const orderCount = customerOrders.length;
      const revenue = customerOrders.reduce(
        (sum, order) => sum + order.price * order.quantity, 
        0
      );
      
      return { customerId: customer.id, orders: orderCount, revenue };
    });
    
    const bestCustomers = customerStats
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10); // Top 10
    
    return {
      totalOrders,
      confirmedOrders,
      deliveredOrders,
      totalRevenue,
      deliveredRevenue,
      ordersByProduct,
      ordersByCategory,
      averageRevenuePerCustomer,
      bestSellingProducts,
      bestCustomers
    };
  }
};
