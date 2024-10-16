import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import OrderDetails from './pages/OrderDetails';
import Profile from './pages/Profile';
import { AuthProvider } from './contexts/AuthContext';
import { OrderProvider } from './contexts/OrderContext';

function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <Router>
          <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/order/:id" element={<OrderDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </OrderProvider>
    </AuthProvider>
  );
}

export default App;