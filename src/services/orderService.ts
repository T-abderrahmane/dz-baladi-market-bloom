
import { supabase } from '@/integrations/supabase/client';
import { Order, OrderStatus } from '@/schema/database';

export const orderService = {
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
  
  // Get order by ID
  getById: async (id: string): Promise<Order | null> => {
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
  
  // Create a new order
  create: async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
    const { data, error } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating order:', error);
      throw error;
    }
    
    return data;
  },
  
  // Update an order
  update: async (id: string, updates: Partial<Order>): Promise<Order> => {
    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating order:', error);
      throw error;
    }
    
    return data;
  },
  
  // Update order status
  updateStatus: async (id: string, status: OrderStatus, notes?: string): Promise<Order> => {
    const updates: any = { status };
    if (notes) updates.notes = notes;
    
    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
    
    return data;
  }
};
