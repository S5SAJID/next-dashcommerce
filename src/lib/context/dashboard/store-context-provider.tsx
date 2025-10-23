'use client';

import { 
  createContext, 
  useContext, 
  type ReactNode 
} from 'react';

import { StoreTable } from "@/db/schema" 

type DashboardStoreInfo = {
  store: typeof StoreTable.$inferSelect | null; 
}

const StoreContext = createContext<DashboardStoreInfo | null>(null);

interface DashboardStoreInfoProviderProps {
  initialStore: typeof StoreTable.$inferSelect | null; 
  children: ReactNode;
}

export function DashboardStoreInfoProvider({ initialStore, children }: DashboardStoreInfoProviderProps) {
  const contextValue: DashboardStoreInfo = {
    store: initialStore,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}

export function useDashboardStoreInfo() {
  const context = useContext(StoreContext);
  
  if (!context) {
    throw new Error('useStore must be used within a <StoreProvider>');
  }
  
  return context;
}