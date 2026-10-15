import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { safeStorage } from '../utils/safeStorage';

interface AuthContextType {
  isProfileComplete: boolean;
  completeProfile: (uid: string) => void;
  userRole: 'commuter' | 'operator';
  setUserRole: (role: 'commuter' | 'operator') => void;
  userId: string | null;
  logout: () => void;
  resetProfile: () => void;
  walletBalance: number;
  topUpBalance: (amount: number) => Promise<void>;
  deductBalance: (amount: number) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  isProfileComplete: false,
  completeProfile: () => {},
  userRole: 'commuter',
  setUserRole: () => {},
  userId: null,
  logout: () => {},
  resetProfile: () => {},
  walletBalance: 24500,
  topUpBalance: async () => {},
  deductBalance: async () => false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [userRole, setUserRole] = useState<'commuter' | 'operator'>('commuter');
  const [userId, setUserId] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<number>(24500);

  useEffect(() => {
    // Load profile status, user ID, role, and balance on app start
    Promise.all([
      safeStorage.getItem('isProfileComplete'),
      safeStorage.getItem('userId'),
      safeStorage.getItem('userRole'),
      safeStorage.getItem('walletBalance')
    ]).then(([profileVal, idVal, roleVal, balanceVal]) => {
      if (profileVal === 'true') setIsProfileComplete(true);
      if (idVal) setUserId(idVal);
      if (roleVal === 'commuter' || roleVal === 'operator') setUserRole(roleVal);
      if (balanceVal) setWalletBalance(parseFloat(balanceVal));
    });
  }, []);

  const completeProfile = async (uid: string) => {
    setUserId(uid);
    setIsProfileComplete(true);
    await safeStorage.setItem('userId', uid);
    await safeStorage.setItem('isProfileComplete', 'true');
    await safeStorage.setItem('userRole', userRole);
  };
  
  const logout = async () => {
    setUserId(null);
    setIsProfileComplete(false);
    await safeStorage.removeItem('userId');
    await safeStorage.removeItem('isProfileComplete');
  };

  const resetProfile = async () => {
    setIsProfileComplete(false);
    setUserRole('commuter');
    setUserId(null);
    setWalletBalance(24500);
    await safeStorage.removeItem('isProfileComplete');
    await safeStorage.removeItem('userId');
    await safeStorage.removeItem('userRole');
    await safeStorage.removeItem('walletBalance');
  };

  const topUpBalance = async (amount: number) => {
    const newBalance = walletBalance + amount;
    setWalletBalance(newBalance);
    await safeStorage.setItem('walletBalance', newBalance.toString());
  };

  const deductBalance = async (amount: number): Promise<boolean> => {
    if (walletBalance < amount) return false;
    const newBalance = walletBalance - amount;
    setWalletBalance(newBalance);
    await safeStorage.setItem('walletBalance', newBalance.toString());
    return true;
  };

  return (
    <AuthContext.Provider value={{ 
      isProfileComplete, 
      completeProfile, 
      userRole, 
      setUserRole, 
      userId, 
      logout, 
      resetProfile,
      walletBalance,
      topUpBalance,
      deductBalance
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
