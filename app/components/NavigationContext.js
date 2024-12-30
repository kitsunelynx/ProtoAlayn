'use client';
import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const [currentView, setCurrentView] = useState('home');
  const [previousView, setPreviousView] = useState(null);

  const navigate = (view) => {
    setPreviousView(currentView);
    setCurrentView(view);
  };

  const goBack = () => {
    if (previousView) {
      setCurrentView(previousView);
      setPreviousView(null);
    }
  };

  return (
    <NavigationContext.Provider value={{ currentView, navigate, goBack }}>
      {children}
    </NavigationContext.Provider>
  );
}

export const useNavigation = () => useContext(NavigationContext); 