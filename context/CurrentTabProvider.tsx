import React, { createContext, useContext, useState } from 'react';

interface CurrentTabContextType {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

const CurrentTabContext = createContext<CurrentTabContextType | undefined>(undefined);

export const useCurrentTab = () => {
  const context = useContext(CurrentTabContext);
  if (!context) {
    throw new Error('useCurrentTab must be used within a CurrentTabProvider');
  }
  return context;
};

export const CurrentTabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState('userhome');

  return (
    <CurrentTabContext.Provider value={{ currentTab, setCurrentTab }}>
      {children}
    </CurrentTabContext.Provider>
  );
};
