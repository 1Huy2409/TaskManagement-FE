import React, { createContext, useContext, useState, useCallback } from 'react';

export type UserInfo = {
  id: number;
  username: string;
  email: string;
  fullname: string;
  avatar?: string;
};

type UserCtxType = {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  clearUser: () => void;
};

const UserCtx = createContext<UserCtxType | null>(null);

const USER_INFO_KEY = 'user_info';

export const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  // Initialize user from localStorage if available
  const [user, setUserState] = useState<UserInfo | null>(() => {
    const stored = localStorage.getItem(USER_INFO_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const setUser = useCallback((userData: UserInfo | null) => {
    if (userData) {
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(userData));
      setUserState(userData);
    } else {
      localStorage.removeItem(USER_INFO_KEY);
      setUserState(null);
    }
  }, []);

  const clearUser = useCallback(() => {
    localStorage.removeItem(USER_INFO_KEY);
    setUserState(null);
  }, []);

  return (
    <UserCtx.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserCtx.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserCtx);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};
