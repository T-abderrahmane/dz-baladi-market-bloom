
import { supabase } from '@/integrations/supabase/client';
import { OrderStatus } from '@/schema/database';

export const statisticsService = {
  // Get overall statistics
  getOverallStatistics: async () => {
    // Get all orders to calculate statistics
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*, products(name, category_id)');
    
    if (ordersError) {
      console.error('Error fetching orders for statistics:', ordersError);
      throw ordersError;
    }
    
    // Get categories for reference
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name');
    
    if (categoriesError) {
      console.error('Error fetching categories for statistics:', categoriesError);
      throw categoriesError;
    }
    
    // Get customers for revenue per customer calculation
    const { data: customers, error: customersError } = await supabase
      .from('customers')
      .select('id');
    
    if (customersError) {
      console.error('Error fetching customers for statistics:', customersError);
      throw customersError;
    }
    
    const categoryMap = categories.reduce((map: Record<string, string>, category) => {
      map[category.id] = category.name;
      return map;
    }, {});
    
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
      ordersByProduct[order.product_id] = (ordersByProduct[order.product_id] || 0) + 1;
    });
    
    // Count orders by category
    const ordersByCategory: Record<string, number> = {};
    orders.forEach(order => {
      if (order.products && order.products.category_id) {
        const categoryId = order.products.category_id;
        ordersByCategory[categoryId] = (ordersByCategory[categoryId] || 0) + 1;
      }
    });
    
    // Calculate average revenue per customer
    let averageRevenuePerCustomer = 0;
    if (customers.length > 0) {
      const customerOrders = customers.map(customer => {
        const customerOrdersList = orders.filter(order => order.customer_id === customer.id);
        const revenue = customerOrdersList.reduce(
          (sum, order) => sum + order.price * order.quantity, 
          0
        );
        return { customerId: customer.id, revenue };
      });
      
      const totalCustomerRevenue = customerOrders.reduce((sum, co) => sum + co.revenue, 0);
      averageRevenuePerCustomer = totalCustomerRevenue / customers.length;
    }
    
    // Find best selling products
    const bestSellingProducts = Object.entries(ordersByProduct)
      .map(([productId, count]) => {
        const product = orders.find(o => o.product_id === productId)?.products;
        return { 
          productId, 
          count,
          name: product?.name || 'Unknown Product',
          revenue: orders
            .filter(o => o.product_id === productId)
            .reduce((sum, o) => sum + o.price * o.quantity, 0)
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10
    
    // Find best customers
    const customerStats = Object.values(
      orders.reduce((acc: Record<string, any>, order) => {
        const customerId = order.customer_id;
        if (!acc[customerId]) {
          acc[customerId] = {
            customerId,
            name: order.customer_name,
            orders: 0,
            revenue: 0
          };
        }
        
        acc[customerId].orders += 1;
        acc[customerId].revenue += order.price * order.quantity;
        
        return acc;
      }, {})
    ).sort((a: any, b: any) => b.revenue - a.revenue).slice(0, 10);
    
    // Calculate monthly revenue for chart data
    const monthlyRevenue = orders.reduce((acc: Record<string, number>, order) => {
      const date = new Date(order.date);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      acc[monthYear] = (acc[monthYear] || 0) + (order.price * order.quantity);
      return acc;
    }, {});
    
    const revenueData = Object.entries(monthlyRevenue).map(([month, revenue]) => {
      const [year, monthNum] = month.split('-');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return {
        name: monthNames[parseInt(monthNum) - 1],
        revenue
      };
    }).sort((a, b) => {
      const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name);
    });
    
    // Status distribution for charts
    const orderStatusData = [
      { name: 'Pending', value: orders.filter(o => o.status === OrderStatus.PENDING).length },
      { name: 'Confirmed', value: confirmedOrders },
      { name: 'Delivered', value: deliveredOrders },
      { name: 'Shipped', value: orders.filter(o => o.status === OrderStatus.SHIPPED).length },
      { name: 'Canceled', value: orders.filter(o => o.status === OrderStatus.CANCELED).length },
    ];
    
    // Orders by category
    const ordersByCategoryData = Object.entries(ordersByCategory)
      .map(([categoryId, count]) => ({
        name: categoryMap[categoryId] || 'Unknown Category',
        value: count
      }));
    
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
      bestCustomers,
      revenueData,
      orderStatusData,
      ordersByCategoryData
    };
  }
};
