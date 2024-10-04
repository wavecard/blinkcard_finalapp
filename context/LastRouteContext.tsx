import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LastRouteContextProps {
  lastRoute: string | null;
  setLastRoute: (route: string | null) => void;
}

const LastRouteContext = createContext<LastRouteContextProps | undefined>(undefined);

export const LastRouteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lastRoute, setLastRoute] = useState<string | null>(null);

  return (
    <LastRouteContext.Provider value={{ lastRoute, setLastRoute }}>
      {children}
    </LastRouteContext.Provider>
  );
};

export const useLastRoute = (): LastRouteContextProps => {
  const context = useContext(LastRouteContext);
  if (!context) {
    throw new Error('useLastRoute must be used within a LastRouteProvider');
  }
  return context;
};
