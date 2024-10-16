import React from 'react';
import { Link } from 'react-router-dom';
import { User, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <Package className="mr-2" />
          Siha Delivery
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-blue-200">Home</Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-blue-200 flex items-center">
                <User className="mr-1" />
                {user?.name || 'Profile'}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;