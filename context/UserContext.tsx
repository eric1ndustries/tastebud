"use client"

import { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  name: string;
  email: string;
  password: string;
};

type UserContextType = {
    user: User[];
    
  };