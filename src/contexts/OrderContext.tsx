import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

interface Order {
  id: string;
  pickupLocation: string;
  deliveryLocation: string;
  status: string;
  pickupCoordinates: [number, number];
  deliveryCoordinates: [number, number];
}

interface OrderContextType {
  orders: Order[];
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { socket } = useAuth();

  useEffect(() => {
    fetchOrders();

    if (socket) {
      socket.on('orderUpdated', (updatedOrder: Order) => {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === updatedOrder.id ? updatedOrder : order
          )
        );
      });
    }

    return () => {
      if (socket) {
        socket.off('orderUpdated');
      }
    };
  }, [socket]);

  const fetchOrders = async () => {
    try {
      // For demo purposes, set mock orders
      setOrders([
        {
          id: '1',
          pickupLocation: '123 Main St',
          deliveryLocation: '456 Elm St',
          status: 'pending',
          pickupCoordinates: [40.7128, -74.0060],
          deliveryCoordinates: [40.7589, -73.9851]
        },
        {
          id: '2',
          pickupLocation: '789 Oak Ave',
          deliveryLocation: '101 Pine Rd',
          status: 'assigned',
          pickupCoordinates: [40.7282, -73.7949],
          deliveryCoordinates: [40.7489, -73.9680]
        }
      ]);
      // In a real application, you would fetch orders from the API
      // const response = await axios.get('/api/orders');
      // setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
  };

  const getOrderById = (id: string) => {
    return orders.find(order => order.id === id);
  };

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      // For demo purposes, update the order status locally
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === id ? { ...order, status } : order
        )
      );
      // In a real application, you would make an API call here
      // const response = await axios.put(`/api/orders/${id}/status`, { status });
      // setOrders(prevOrders =>
      //   prevOrders.map(order =>
      //     order.id === id ? response.data : order
      //   )
      // );
    } catch (error) {
      console.error('Failed to update order status', error);
    }
  };

  return (
    <OrderContext.Provider value={{ orders, getOrderById, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};