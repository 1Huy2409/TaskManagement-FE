import React, { createContext, useContext, useRef, useCallback } from 'react';

type TokenCtxType = {
  getAccessToken: () => string | null;
  setAccessToken: (t: string | null) => void;
  clearAccessToken: () => void;
};

const TokenCtx = createContext<TokenCtxType | null>(null);

export const TokenProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const accessTokenRef = useRef<string | null>(null);

  const getAccessToken = useCallback(() => accessTokenRef.current, []);
  const setAccessToken = useCallback((t: string | null) => { accessTokenRef.current = t; }, []);
  const clearAccessToken = useCallback(() => { accessTokenRef.current = null; }, []);

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
