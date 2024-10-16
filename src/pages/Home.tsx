import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useOrder } from '../contexts/OrderContext';
import AvailabilityToggle from '../components/AvailabilityToggle';
import OrderList from '../components/OrderList';
import Map from '../components/Map';

const Home: React.FC = () => {
  const { user } = useAuth();
  const { orders } = useOrder();
  const navigate = useNavigate();

  const handleOrderSelect = (orderId: string) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome, {user?.name}!</h1>
      <AvailabilityToggle />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Available Orders</h2>
          <OrderList orders={orders} onOrderSelect={handleOrderSelect} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Order Locations</h2>
          <Map orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default Home;