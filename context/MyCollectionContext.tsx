"use client"

import { createContext, useContext, useState, ReactNode } from 'react';

type MyCollectionItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type MyCollectionContextType = {
  myCollection: MyCollectionItem[];
  addToMyCollection: (item: MyCollectionItem) => void;
  removeFromMyCollection: (id: string) => void;
  clearMyCollection: () => void;
};

const MyCollectionContext = createContext<MyCollectionContextType | undefined>(undefined);

export const MyCollectionProvider = ({ children }: { children: ReactNode }) => {
  const [myCollection, setMyCollection] = useState<MyCollectionItem[]>([]);

  const addToMyCollection = (item: MyCollectionItem) => {
    setMyCollection((prevMyCollection) => {
      const existingItem = prevMyCollection.find((i) => i.id === item.id);
      if (existingItem) {
        return prevMyCollection.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prevMyCollection, item];
    });
  };

  const removeFromMyCollection = (id: string) => {
    setMyCollection((prevMyCollection) => prevMyCollection.filter((item) => item.id !== id));
  };

  const clearMyCollection = () => {
    setMyCollection([]);
  };

  return (
    <MyCollectionContext.Provider value={{ myCollection, addToMyCollection, removeFromMyCollection, clearMyCollection }}>
      {children}
    </MyCollectionContext.Provider>
  );
};

export const useCollection = () => {
  const context = useContext(MyCollectionContext);
  if (!context) {
    throw new Error('useCollection must be used within a MyCollectionProvider');
  }
  return context;
};
