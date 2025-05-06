import { supabase } from '@/integrations/supabase/client';
import { Product, Category, Customer, Order, OrderStatus } from '@/schema/database';

// Helper function to convert database date strings to Date objects
const convertDates = <T extends { createdAt?: any, updatedAt?: any, date?: any }>(item: any): T => {
  // Make a copy of the item
  const result = { ...item } as T;
  
  // Convert from snake_case to camelCase
  if (item.created_at) result.createdAt = new Date(item.created_at);
  if (item.updated_at) result.updatedAt = new Date(item.updated_at);
  if (item.date) result.date = new Date(item.date);
  
  // Keep original properties in the result if needed (for example when passing back to the database)
  return result;
};

// Function to map database column names to model property names
const mapDbToModel = (item: any): any => {
  const result: any = {};
  
  // Map common fields
  if (item.id !== undefined) result.id = item.id;
  if (item.created_at !== undefined) result.createdAt = new Date(item.created_at);
  if (item.updated_at !== undefined) result.updatedAt = new Date(item.updated_at);
  
  // Map product specific fields
  if (item.name !== undefined) result.name = item.name;
  if (item.price !== undefined) result.price = item.price;
  if (item.old_price !== undefined) result.oldPrice = item.old_price;
  if (item.stock !== undefined) result.stock = item.stock;
  if (item.category_id !== undefined) result.categoryId = item.category_id;
  if (item.short_description !== undefined) result.shortDescription = item.short_description;
  if (item.long_description !== undefined) result.longDescription = item.long_description;
  if (item.images !== undefined) result.images = item.images;
  if (item.colors !== undefined) result.colors = item.colors;
  if (item.sizes !== undefined) result.sizes = item.sizes;
  if (item.description !== undefined) result.description = item.description;
  
  // Map order specific fields
  if (item.product_id !== undefined) result.productId = item.product_id;
  if (item.customer_id !== undefined) result.customerId = item.customer_id;
  if (item.customer_name !== undefined) result.customerName = item.customer_name;
  if (item.customer_phone !== undefined) result.customerPhone = item.customer_phone;
  if (item.date !== undefined) result.date = new Date(item.date);
  if (item.status !== undefined) result.status = item.status as OrderStatus;
  if (item.quantity !== undefined) result.quantity = item.quantity;
  if (item.notes !== undefined) result.notes = item.notes;
  if (item.wilaya !== undefined) result.wilaya = item.wilaya;
  if (item.commune !== undefined) result.commune = item.commune;
  if (item.address !== undefined) result.address = item.address;
  if (item.phone_number !== undefined) result.phoneNumber = item.phone_number;
  
  // Add any computed or related fields
  if (item.categories) {
    result.categoryName = item.categories.name;
  }
  
  if (item.products) {
    result.product = mapDbToModel(item.products);
  }
  
  return result;
};

// Function to map model property names to database column names
const mapModelToDb = (item: any): any => {
  const result: any = {};
  
  // Map common fields
  if (item.id !== undefined) result.id = item.id;
  
  // Map product specific fields
  if (item.name !== undefined) result.name = item.name;
  if (item.price !== undefined) result.price = item.price;
  if (item.oldPrice !== undefined) result.old_price = item.oldPrice;
  if (item.stock !== undefined) result.stock = item.stock;
  if (item.categoryId !== undefined) result.category_id = item.categoryId;
  if (item.shortDescription !== undefined) result.short_description = item.shortDescription;
  if (item.longDescription !== undefined) result.long_description = item.longDescription;
  if (item.images !== undefined) result.images = item.images;
  if (item.colors !== undefined) result.colors = item.colors;
  if (item.sizes !== undefined) result.sizes = item.sizes;
  if (item.description !== undefined) result.description = item.description;
  
  // Map order specific fields
  if (item.productId !== undefined) result.product_id = item.productId;
  if (item.customerId !== undefined) result.customer_id = item.customerId;
  if (item.customerName !== undefined) result.customer_name = item.customerName;
  if (item.customerPhone !== undefined) result.customer_phone = item.customerPhone;
  if (item.date !== undefined) {
    // If it's a Date object, convert to ISO string
    result.date = item.date instanceof Date ? item.date.toISOString() : item.date;
  }
  if (item.status !== undefined) result.status = item.status;
  if (item.quantity !== undefined) result.quantity = item.quantity;
  if (item.notes !== undefined) result.notes = item.notes;
  if (item.wilaya !== undefined) result.wilaya = item.wilaya;
  if (item.commune !== undefined) result.commune = item.commune;
  if (item.address !== undefined) result.address = item.address;
  if (item.phoneNumber !== undefined) result.phone_number = item.phoneNumber;
  
  return result;
};

// Product model operations
export const productModel = {
  getAll: async (): Promise<Product[]> => {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name)')
      .order('name');
    
    if (error) throw error;
    
    return (data || []).map(item => mapDbToModel(item)) as Product[];
  },
  
  getById: async (id: string): Promise<Product | null> => {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name)')
      .eq('id', id)
      .maybeSingle();
    
    if (error) throw error;
    if (!data) return null;
    
    return mapDbToModel(data) as Product;
  },
  
  create: async (product: Partial<Product>): Promise<Product> => {
    const dbProduct = mapModelToDb(product);
    
    const { data, error } = await supabase
      .from('products')
      .insert(dbProduct)
      .select('*, categories(name)')
      .single();
    
    if (error) throw error;
    
    return mapDbToModel(data) as Product;
  },
  
  update: async (id: string, product: Partial<Product>): Promise<Product> => {
    const dbProduct = mapModelToDb(product);
    
    const { data, error } = await supabase
      .from('products')
      .update(dbProduct)
      .eq('id', id)
      .select('*, categories(name)')
      .single();
    
    if (error) throw error;
    
    return mapDbToModel(data) as Product;
  },
  
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Category model operations
export const categoryModel = {
  getAll: async (): Promise<Category[]> => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) throw error;
    
    return (data || []).map(item => mapDbToModel(item)) as Category[];
  },
  
  getById: async (id: string): Promise<Category | null> => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) throw error;
    if (!data) return null;
    
    return mapDbToModel(data) as Category;
  },
  
  create: async (category: Partial<Category>): Promise<Category> => {
    const dbCategory = mapModelToDb(category);
    
    const { data, error } = await supabase
      .from('categories')
      .insert(dbCategory)
      .select()
      .single();
    
    if (error) throw error;
    
    return mapDbToModel(data) as Category;
  },
  
  update: async (id: string, category: Partial<Category>): Promise<Category> => {
    const dbCategory = mapModelToDb(category);
    
    const { data, error } = await supabase
      .from('categories')
      .update(dbCategory)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return mapDbToModel(data) as Category;
  },
  
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Order model operations
export const orderModel = {
  getAll: async (): Promise<Order[]> => {
    const { data, error } = await supabase
      .from('orders')
      .select('*, products(*)')
      .order('date', { ascending: false });
    
    if (error) throw error;
    
    return (data || []).map(item => mapDbToModel(item)) as Order[];
  },
  
  getById: async (id: string): Promise<Order | null> => {
    const { data, error } = await supabase
      .from('orders')
      .select('*, products(*)')
      .eq('id', id)
      .maybeSingle();
    
    if (error) throw error;
    if (!data) return null;
    
    return mapDbToModel(data) as Order;
  },
  
  create: async (order: Partial<Order>): Promise<Order> => {
    const dbOrder = mapModelToDb(order);
    
    const { data, error } = await supabase
      .from('orders')
      .insert(dbOrder)
      .select('*, products(*)')
      .single();
    
    if (error) throw error;
    
    return mapDbToModel(data) as Order;
  },
  
  update: async (id: string, order: Partial<Order>): Promise<Order> => {
    const dbOrder = mapModelToDb(order);
    
    const { data, error } = await supabase
      .from('orders')
      .update(dbOrder)
      .eq('id', id)
      .select('*, products(*)')
      .single();
    
    if (error) throw error;
    
    return mapDbToModel(data) as Order;
  },
  
  updateStatus: async (id: string, status: OrderStatus, notes?: string): Promise<Order> => {
    const { data, error } = await supabase
      .from('orders')
      .update({ 
        status, 
        notes: notes || null 
      })
      .eq('id', id)
      .select('*, products(*)')
      .single();
    
    if (error) throw error;
    
    return mapDbToModel(data) as Order;
  },
  
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Customer model operations
export const customerModel = {
  getAll: async (): Promise<Customer[]> => {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('name');
    
    if (error) throw error;
    
    return (data || []).map(item => mapDbToModel(item)) as Customer[];
  },
  
  getById: async (id: string): Promise<Customer | null> => {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) throw error;
    if (!data) return null;
    
    return mapDbToModel(data) as Customer;
  },
  
  create: async (customer: Partial<Customer>): Promise<Customer> => {
    // First check if customer already exists with this phone number
    const { data: existingData } = await supabase
      .from('customers')
      .select('*')
      .eq('phone_number', customer.phoneNumber || '')
      .maybeSingle();
    
    if (existingData) {
      // Customer exists, update info
      return await customerModel.update(existingData.id, customer);
    }
    
    // Customer doesn't exist, create new
    const dbCustomer = mapModelToDb(customer);
    
    const { data, error } = await supabase
      .from('customers')
      .insert(dbCustomer)
      .select()
      .single();
    
    if (error) throw error;
    
    return mapDbToModel(data) as Customer;
  },
  
  update: async (id: string, customer: Partial<Customer>): Promise<Customer> => {
    const dbCustomer = mapModelToDb(customer);
    
    const { data, error } = await supabase
      .from('customers')
      .update(dbCustomer)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return mapDbToModel(data) as Customer;
  },
  
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
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
