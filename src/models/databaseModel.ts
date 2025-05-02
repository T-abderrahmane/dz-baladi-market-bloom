import { Product, Order, Customer, Category, OrderStatus } from '../schema/database';
import { supabase } from '@/integrations/supabase/client';

/**
 * This file contains implementations of database operations
 * using Supabase as the backend
 */

// Products
export const productModel = {
  // Create a new product
  create: async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating product:', error);
      throw error;
    }
    
    return data;
  },
  
  // Get all products
  getAll: async (): Promise<Product[]> => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
    
    return data || [];
  },
  
  // Get a product by ID
  getById: async (id: string): Promise<Product | undefined> => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
    
    return data;
  },
  
  // Get products by category
  getByCategory: async (categoryId: string): Promise<Product[]> => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', categoryId)
      .order('name');
    
    if (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
    
    return data || [];
  },
  
  // Update a product
  update: async (id: string, updates: Partial<Product>): Promise<Product | undefined> => {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating product:', error);
      throw error;
    }
    
    return data;
  },
  
  // Delete a product
  delete: async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
    
    return true;
  },
  
  // Update stock when order is placed
  updateStock: async (productId: string, quantity: number): Promise<boolean> => {
    // First get current product stock
    const { data: product, error: getError } = await supabase
      .from('products')
      .select('stock')
      .eq('id', productId)
      .single();
    
    if (getError) {
      console.error('Error getting product stock:', getError);
      throw getError;
    }
    
    if (!product || product.stock < quantity) return false;
    
    // Update stock
    const { error: updateError } = await supabase
      .from('products')
      .update({ stock: product.stock - quantity })
      .eq('id', productId);
    
    if (updateError) {
      console.error('Error updating product stock:', updateError);
      throw updateError;
    }
    
    return true;
  }
};

// Orders
export const orderModel = {
  // Create a new order
  create: async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order | null> => {
    // Check product availability
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('stock')
      .eq('id', orderData.productId)
      .single();
    
    if (productError) {
      console.error('Error checking product availability:', productError);
      throw productError;
    }
    
    if (!product || product.stock < orderData.quantity) return null;
    
    // Create order
    const { data, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating order:', error);
      throw error;
    }
    
    return data;
  },
  
  // Get all orders
  getAll: async (): Promise<Order[]> => {
    const { data, error } = await supabase
      .from('orders')
      .select('*, products(*)')
      .order('date', { ascending: false });
    
    if (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
    
    return data || [];
  },
  
  // Get order by ID
  getById: async (id: string): Promise<Order | undefined> => {
    const { data, error } = await supabase
      .from('orders')
      .select('*, products(*)')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
    
    return data;
  },
  
  // Get orders by customer
  getByCustomer: async (customerId: string): Promise<Order[]> => {
    const { data, error } = await supabase
      .from('orders')
      .select('*, products(*)')
      .eq('customer_id', customerId)
      .order('date', { ascending: false });
    
    if (error) {
      console.error('Error fetching orders by customer:', error);
      throw error;
    }
    
    return data || [];
  },
  
  // Get orders by status
  getByStatus: async (status: OrderStatus): Promise<Order[]> => {
    const { data, error } = await supabase
      .from('orders')
      .select('*, products(*)')
      .eq('status', status)
      .order('date', { ascending: false });
    
    if (error) {
      console.error('Error fetching orders by status:', error);
      throw error;
    }
    
    return data || [];
  },
  
  // Update order status
  updateStatus: async (id: string, status: OrderStatus, notes?: string): Promise<Order | undefined> => {
    const updates: any = { status };
    if (notes) updates.notes = notes;
    
    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select('*, products(*)')
      .single();
    
    if (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
    
    return data;
  },
  
  // Cancel an order
  cancel: async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from('orders')
      .update({ status: OrderStatus.CANCELED })
      .eq('id', id);
    
    if (error) {
      console.error('Error canceling order:', error);
      throw error;
    }
    
    return true;
  }
};

// Customers
export const customerModel = {
  // Create a new customer
  create: async (customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<Customer> => {
    // Check if customer already exists with the same phone number
    const { data: existingCustomer, error: existingError } = await supabase
      .from('customers')
      .select('*')
      .eq('phone_number', customerData.phoneNumber)
      .maybeSingle();
    
    // If customer exists, return it
    if (existingCustomer) {
      return existingCustomer;
    }
    
    // Otherwise, create new customer
    const { data, error } = await supabase
      .from('customers')
      .insert(customerData)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
    
    return data;
  },
  
  // Get all customers
  getAll: async (): Promise<Customer[]> => {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
    
    return data || [];
  },
  
  // Get customer by ID
  getById: async (id: string): Promise<Customer | undefined> => {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
    
    return data;
  },
  
  // Get customer by phone number
  getByPhone: async (phoneNumber: string): Promise<Customer | undefined> => {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('phone_number', phoneNumber)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching customer by phone:', error);
      throw error;
    }
    
    return data;
  },
  
  // Update customer information
  update: async (id: string, updates: Partial<Customer>): Promise<Customer | undefined> => {
    const { data, error } = await supabase
      .from('customers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
    
    return data;
  },
  
  // Get customer statistics
  getStatistics: async (customerId: string) => {
    const { data: customerOrders, error } = await supabase
      .from('orders')
      .select('*, products(*)')
      .eq('customer_id', customerId);
    
    if (error) {
      console.error('Error fetching customer orders:', error);
      throw error;
    }
    
    const totalOrders = customerOrders?.length || 0;
    const totalSpent = customerOrders?.reduce((sum, order) => sum + order.price * order.quantity, 0) || 0;
    
    const orderedProducts = customerOrders?.map(order => ({
      orderId: order.id,
      productId: order.productId,
      quantity: order.quantity,
      price: order.price,
      date: order.date,
      status: order.status,
      productName: (order.products as any)?.name || 'Unknown Product'
    })) || [];
    
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
  create: async (categoryData: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> => {
    const { data, error } = await supabase
      .from('categories')
      .insert(categoryData)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating category:', error);
      throw error;
    }
    
    return data;
  },
  
  // Get all categories
  getAll: async (): Promise<Category[]> => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
    
    return data || [];
  },
  
  // Get category by ID
  getById: async (id: string): Promise<Category | undefined> => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
    
    return data;
  },
  
  // Update category
  update: async (id: string, updates: Partial<Category>): Promise<Category | undefined> => {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating category:', error);
      throw error;
    }
    
    return data;
  },
  
  // Delete category
  delete: async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
    
    return true;
  }
};

// Statistics functions
export const statisticsModel = {
  // Calculate overall statistics
  getOverallStatistics: async () => {
    // Get all orders
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*, products(name, category_id)');
    
    if (ordersError) {
      console.error('Error fetching orders for statistics:', ordersError);
      throw ordersError;
    }
    
    // Get categories
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name');
    
    if (categoriesError) {
      console.error('Error fetching categories for statistics:', categoriesError);
      throw categoriesError;
    }
    
    // Get customers
    const { data: customers, error: customersError } = await supabase
      .from('customers')
      .select('id');
    
    if (customersError) {
      console.error('Error fetching customers for statistics:', customersError);
      throw customersError;
    }
    
    const totalOrders = orders?.length || 0;
    const confirmedOrders = orders?.filter(order => order.status === OrderStatus.CONFIRMED).length || 0;
    const deliveredOrders = orders?.filter(order => order.status === OrderStatus.DELIVERED).length || 0;
    
    const totalRevenue = orders?.reduce((sum, order) => sum + order.price * order.quantity, 0) || 0;
    const deliveredRevenue = orders
      ?.filter(order => order.status === OrderStatus.DELIVERED)
      .reduce((sum, order) => sum + order.price * order.quantity, 0) || 0;
    
    return {
      totalOrders,
      confirmedOrders,
      deliveredOrders,
      totalRevenue,
      deliveredRevenue,
      orders,
      categories,
      customers
    };
  }
};
