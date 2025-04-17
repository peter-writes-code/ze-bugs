import React, { createContext, useContext, useState } from 'react';

type BugVariant = 'carabid' | 'fireAnt';

interface BugVariantContextType {
  selectedVariant: BugVariant;
  setSelectedVariant: (variant: BugVariant) => void;
}

const BugVariantContext = createContext<BugVariantContextType | undefined>(undefined);

export function BugVariantProvider({ children }: { children: React.ReactNode }) {
  const [selectedVariant, setSelectedVariant] = useState<BugVariant>('carabid');

  return (
    <BugVariantContext.Provider value={{ selectedVariant, setSelectedVariant }}>
      {children}
    </BugVariantContext.Provider>
  );
}

export function useBugVariant() {
  const context = useContext(BugVariantContext);
  if (context === undefined) {
    throw new Error('useBugVariant must be used within a BugVariantProvider');
  }
  return context;
}