import React from 'react';
import { Package, MapPin } from 'lucide-react';

interface Order {
  id: string;
  pickupLocation: string;
  deliveryLocation: string;
  status: string;
}

interface OrderListProps {
  orders: Order[];
  onOrderSelect: (orderId: string) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onOrderSelect }) => {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
          onClick={() => onOrderSelect(order.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Package className="text-blue-600" />
              <span className="font-semibold">Order #{order.id}</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs ${
              order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
              order.status === 'assigned' ? 'bg-blue-200 text-blue-800' :
              'bg-green-200 text-green-800'
            }`}>
              {order.status}
            </span>
          </div>
          <div className="mt-2 space-y-1">
            <p className="text-sm flex items-center">
              <MapPin className="mr-1 text-gray-500" size={16} />
              Pickup: {order.pickupLocation}
            </p>
            <p className="text-sm flex items-center">
              <MapPin className="mr-1 text-gray-500" size={16} />
              Delivery: {order.deliveryLocation}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;