
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { ListingProvider } from '@/context/ListingContext';
import { AuthProvider } from '@/context/AuthContext';
import { WishlistProvider } from '@/context/WishlistContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthProvider>
        <ListingProvider>
          <WishlistProvider>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </WishlistProvider>
        </ListingProvider>
      </AuthProvider>
    </div>
  );
};

export default Layout;
