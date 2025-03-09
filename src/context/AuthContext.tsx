
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/models';

// Default user for development
const DEFAULT_USER: User = {
  id: "user1",
  name: "John Doe",
  email: "john@example.com",
  phone: "+91 98765 43210",
  location: "Mumbai, India",
  avatar: "https://i.pravatar.cc/150?img=1",
  createdAt: new Date("2023-01-15")
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User>, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('phoneflip_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
    
    // For development only - auto login
    if (process.env.NODE_ENV === 'development' && !storedUser) {
      setUser(DEFAULT_USER);
      localStorage.setItem('phoneflip_user', JSON.stringify(DEFAULT_USER));
    }
  }, []);

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, any non-empty email/password combination works
    if (email && password) {
      const newUser = {
        ...DEFAULT_USER,
        email
      };
      setUser(newUser);
      localStorage.setItem('phoneflip_user', JSON.stringify(newUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };
  
  // Mock register function
  const register = async (userData: Partial<User>, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (userData.email && password) {
      const newUser = {
        ...DEFAULT_USER,
        ...userData,
        id: `user${Date.now()}`,
        createdAt: new Date()
      };
      setUser(newUser as User);
      localStorage.setItem('phoneflip_user', JSON.stringify(newUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('phoneflip_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
