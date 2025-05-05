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
    // Map from our schema to Supabase table format
    const supabaseProductData = {
      name: productData.name,
      price: productData.price,
      old_price: productData.oldPrice,
      category_id: productData.categoryId,
      stock: productData.stock || 0,
      short_description: productData.shortDescription,
      long_description: productData.longDescription,
      images: productData.images,
      colors: productData.colors,
      sizes: productData.sizes,
    };
    
    const { data, error } = await supabase
      .from('products')
      .insert(supabaseProductData)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating product:', error);
      throw error;
    }
    
    // Map from Supabase result back to our schema
    return {
      id: data.id,
      name: data.name,
      price: data.price,
      oldPrice: data.old_price,
      categoryId: data.category_id,
      stock: data.stock,
      shortDescription: data.short_description,
      longDescription: data.long_description,
      images: data.images,
      colors: data.colors,
      sizes: data.sizes,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  },
  
  // Get all products
  getAll: async (): Promise<Product[]> => {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name)')
      .order('name');
    
    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
    
    // Map data from Supabase format to our schema
    return (data || []).map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      oldPrice: item.old_price,
      categoryId: item.category_id,
      stock: item.stock,
      shortDescription: item.short_description,
      longDescription: item.long_description,
      images: item.images,
      colors: item.colors,
      sizes: item.sizes,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      // Add categoryName if available from the join
      categoryName: item.categories?.name
    }));
  },
  
  // Get a product by ID
  getById: async (id: string): Promise<Product | undefined> => {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name)')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
    
    if (!data) return undefined;
    
    return {
      id: data.id,
      name: data.name,
      price: data.price,
      oldPrice: data.old_price,
      categoryId: data.category_id,
      stock: data.stock,
      shortDescription: data.short_description,
      longDescription: data.long_description,
      images: data.images,
      colors: data.colors,
      sizes: data.sizes,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      categoryName: data.categories?.name
    };
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
    
    return (data || []).map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      oldPrice: item.old_price,
      categoryId: item.category_id,
      stock: item.stock,
      shortDescription: item.short_description,
      longDescription: item.long_description,
      images: item.images,
      colors: item.colors,
      sizes: item.sizes,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    }));
  },
  
  // Update a product
  update: async (id: string, updates: Partial<Product>): Promise<Product | undefined> => {
    // Map our schema to Supabase format
    const supabaseUpdates: any = {};
    
    if (updates.name !== undefined) supabaseUpdates.name = updates.name;
    if (updates.price !== undefined) supabaseUpdates.price = updates.price;
    if (updates.oldPrice !== undefined) supabaseUpdates.old_price = updates.oldPrice;
    if (updates.categoryId !== undefined) supabaseUpdates.category_id = updates.categoryId;
    if (updates.stock !== undefined) supabaseUpdates.stock = updates.stock;
    if (updates.shortDescription !== undefined) supabaseUpdates.short_description = updates.shortDescription;
    if (updates.longDescription !== undefined) supabaseUpdates.long_description = updates.longDescription;
    if (updates.images !== undefined) supabaseUpdates.images = updates.images;
    if (updates.colors !== undefined) supabaseUpdates.colors = updates.colors;
    if (updates.sizes !== undefined) supabaseUpdates.sizes = updates.sizes;
    
    const { data, error } = await supabase
      .from('products')
      .update(supabaseUpdates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating product:', error);
      throw error;
    }
    
    if (!data) return undefined;
    
    return {
      id: data.id,
      name: data.name,
      price: data.price,
      oldPrice: data.old_price,
      categoryId: data.category_id,
      stock: data.stock,
      shortDescription: data.short_description,
      longDescription: data.long_description,
      images: data.images,
      colors: data.colors,
      sizes: data.sizes,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
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
    
    // Map from our schema to Supabase table format
    const supabaseOrderData = {
      product_id: orderData.productId,
      customer_id: orderData.customerId,
      customer_name: orderData.customerName,
      customer_phone: orderData.customerPhone,
      date: orderData.date,
      status: orderData.status,
      wilaya: orderData.wilaya,
      commune: orderData.commune,
      address: orderData.address,
      quantity: orderData.quantity,
      price: orderData.price,
      notes: orderData.notes
    };
    
    // Create order
    const { data, error } = await supabase
      .from('orders')
      .insert(supabaseOrderData)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating order:', error);
      throw error;
    }
    
    // Map from Supabase result back to our schema
    return {
      id: data.id,
      productId: data.product_id,
      customerId: data.customer_id,
      customerName: data.customer_name,
      customerPhone: data.customer_phone,
      date: data.date,
      status: data.status,
      wilaya: data.wilaya,
      commune: data.commune,
      address: data.address,
      quantity: data.quantity,
      price: data.price,
      notes: data.notes,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
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
    
    return (data || []).map(item => ({
      id: item.id,
      productId: item.product_id,
      customerId: item.customer_id,
      customerName: item.customer_name,
      customerPhone: item.customer_phone,
      date: item.date,
      status: item.status,
      wilaya: item.wilaya,
      commune: item.commune,
      address: item.address,
      quantity: item.quantity,
      price: item.price,
      notes: item.notes,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      // Add product details if needed
      product: item.products ? {
        id: item.products.id,
        name: item.products.name,
        // Map other product fields as needed
      } : undefined
    }));
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
    
    if (!data) return undefined;
    
    return {
      id: data.id,
      productId: data.product_id,
      customerId: data.customer_id,
      customerName: data.customer_name,
      customerPhone: data.customer_phone,
      date: data.date,
      status: data.status,
      wilaya: data.wilaya,
      commune: data.commune,
      address: data.address,
      quantity: data.quantity,
      price: data.price,
      notes: data.notes,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      // Add product details if needed
      product: data.products ? {
        id: data.products.id,
        name: data.products.name,
        // Map other product fields as needed
      } : undefined
    };
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
    
    return (data || []).map(item => ({
      id: item.id,
      productId: item.product_id,
      customerId: item.customer_id,
      customerName: item.customer_name,
      customerPhone: item.customer_phone,
      date: item.date,
      status: item.status,
      wilaya: item.wilaya,
      commune: item.commune,
      address: item.address,
      quantity: item.quantity,
      price: item.price,
      notes: item.notes,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      // Add product details if needed
      product: item.products ? {
        id: item.products.id,
        name: item.products.name,
        // Map other product fields as needed
      } : undefined
    }));
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
    
    return (data || []).map(item => ({
      id: item.id,
      productId: item.product_id,
      customerId: item.customer_id,
      customerName: item.customer_name,
      customerPhone: item.customer_phone,
      date: item.date,
      status: item.status,
      wilaya: item.wilaya,
      commune: item.commune,
      address: item.address,
      quantity: item.quantity,
      price: item.price,
      notes: item.notes,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      // Add product details if needed
      product: item.products ? {
        id: item.products.id,
        name: item.products.name,
        // Map other product fields as needed
      } : undefined
    }));
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
    
    if (!data) return undefined;
    
    return {
      id: data.id,
      productId: data.product_id,
      customerId: data.customer_id,
      customerName: data.customer_name,
      customerPhone: data.customer_phone,
      date: data.date,
      status: data.status,
      wilaya: data.wilaya,
      commune: data.commune,
      address: data.address,
      quantity: data.quantity,
      price: data.price,
      notes: data.notes,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      // Add product details if needed
      product: data.products ? {
        id: data.products.id,
        name: data.products.name,
        // Map other product fields as needed
      } : undefined
    };
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
    // Map to Supabase format
    const supabaseCustomerData = {
      name: customerData.name,
      phone_number: customerData.phoneNumber,
      wilaya: customerData.wilaya,
      commune: customerData.commune,
      address: customerData.address
    };
    
    // Check if customer already exists with the same phone number
    const { data: existingCustomer, error: existingError } = await supabase
      .from('customers')
      .select('*')
      .eq('phone_number', customerData.phoneNumber)
      .maybeSingle();
    
    // If customer exists, return it mapped to our schema
    if (existingCustomer) {
      return {
        id: existingCustomer.id,
        name: existingCustomer.name,
        phoneNumber: existingCustomer.phone_number,
        wilaya: existingCustomer.wilaya,
        commune: existingCustomer.commune,
        address: existingCustomer.address,
        createdAt: existingCustomer.created_at,
        updatedAt: existingCustomer.updated_at
      };
    }
    
    // Otherwise, create new customer
    const { data, error } = await supabase
      .from('customers')
      .insert(supabaseCustomerData)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
    
    // Map result back to our schema
    return {
      id: data.id,
      name: data.name,
      phoneNumber: data.phone_number,
      wilaya: data.wilaya,
      commune: data.commune,
      address: data.address,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
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
    
    return (data || []).map(item => ({
      id: item.id,
      name: item.name,
      phoneNumber: item.phone_number,
      wilaya: item.wilaya,
      commune: item.commune,
      address: item.address,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    }));
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
    
    if (!data) return undefined;
    
    return {
      id: data.id,
      name: data.name,
      phoneNumber: data.phone_number,
      wilaya: data.wilaya,
      commune: data.commune,
      address: data.address,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
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
    
    if (!data) return undefined;
    
    return {
      id: data.id,
      name: data.name,
      phoneNumber: data.phone_number,
      wilaya: data.wilaya,
      commune: data.commune,
      address: data.address,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  },
  
  // Update customer information
  update: async (id: string, updates: Partial<Customer>): Promise<Customer | undefined> => {
    // Map our schema to Supabase format
    const supabaseUpdates: any = {};
    
    if (updates.name !== undefined) supabaseUpdates.name = updates.name;
    if (updates.phoneNumber !== undefined) supabaseUpdates.phone_number = updates.phoneNumber;
    if (updates.wilaya !== undefined) supabaseUpdates.wilaya = updates.wilaya;
    if (updates.commune !== undefined) supabaseUpdates.commune = updates.commune;
    if (updates.address !== undefined) supabaseUpdates.address = updates.address;
    
    const { data, error } = await supabase
      .from('customers')
      .update(supabaseUpdates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
    
    if (!data) return undefined;
    
    return {
      id: data.id,
      name: data.name,
      phoneNumber: data.phone_number,
      wilaya: data.wilaya,
      commune: data.commune,
      address: data.address,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
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
    const supabaseCategoryData = {
      name: categoryData.name,
      description: categoryData.description
    };
    
    const { data, error } = await supabase
      .from('categories')
      .insert(supabaseCategoryData)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating category:', error);
      throw error;
    }
    
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
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
    
    return (data || []).map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    }));
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
    
    if (!data) return undefined;
    
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  },
  
  // Update category
  update: async (id: string, updates: Partial<Category>): Promise<Category | undefined> => {
    const supabaseUpdates: any = {};
    
    if (updates.name !== undefined) supabaseUpdates.name = updates.name;
    if (updates.description !== undefined) supabaseUpdates.description = updates.description;
    
    const { data, error } = await supabase
      .from('categories')
      .update(supabaseUpdates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating category:', error);
      throw error;
    }
    
    if (!data) return undefined;
    
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
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
