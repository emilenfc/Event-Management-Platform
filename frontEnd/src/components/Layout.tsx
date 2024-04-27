import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
    isLoggedIn?: boolean;
    children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ isLoggedIn, children }) => {
  return (
    <div>
      <nav className="bg-gray-900 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <Link to="/" className="text-white font-bold">
              Home
            </Link>
            <Link to="/events" className="text-white font-bold">
              Events
            </Link>
                  </div>
            <div className='flex space-x-6'>

            {isLoggedIn && (
                      <>
                <Link to="/userDashboard" className="text-white font-bold">
                  Dashboard
                </Link>
                
                <Link to="/logout" className="text-white font-bold ">
                  Logout
                </Link>
              </>
            )}
      
            {!isLoggedIn && (
              <Link to="/login" className="text-white font-bold">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <div className="container mx-auto mt-4">{children}</div>
    </div>
  );
};

export default Layout;