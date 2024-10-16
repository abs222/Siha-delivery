import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOrder } from '../contexts/OrderContext';
import Map from '../components/Map';

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrderById, updateOrderStatus } = useOrder();
  const [otp, setOtp] = useState('');
  const order = getOrderById(id || '');

  if (!order) {
    return <div>Order not found</div>;
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement OTP verification logic here
    console.log('OTP submitted:', otp);
    // If OTP is correct, update order status
    updateOrderStatus(order.id, 'picked_up');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Order Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Order #{order.id}</h2>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Pickup Location:</strong> {order.pickupLocation}</p>
        <p><strong>Delivery Location:</strong> {order.deliveryLocation}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Enter OTP</h3>
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Verify OTP
          </button>
        </form>
      </div>
      <div className="h-64">
        <Map orders={[order]} />
      </div>
    </div>
  );
};

export default OrderDetails;