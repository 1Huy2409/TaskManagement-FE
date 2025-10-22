import React, { createContext, useContext, useCallback } from 'react';

type TokenCtxType = {
  getAccessToken: () => string | null;
  setAccessToken: (t: string | null) => void;
  clearAccessToken: () => void;
};

const TokenCtx = createContext<TokenCtxType | null>(null);

const ACCESS_TOKEN_KEY = 'access_token';

export const TokenProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const getAccessToken = useCallback(() => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }, []);

  const setAccessToken = useCallback((token: string | null) => {
    if (token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  }, []);

  const clearAccessToken = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }, []);

  return (
    <TokenCtx.Provider value={{ getAccessToken, setAccessToken, clearAccessToken }}>
      {children}
    </TokenCtx.Provider>
  );
};

export const useToken = () => {
  const ctx = useContext(TokenCtx);
  if (!ctx) throw new Error('useToken must be used within TokenProvider');
  return ctx;
};
