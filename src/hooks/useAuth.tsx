'use client'

import {useContext} from 'react';
import AuthContext, { AuthContextType } from '../context/AuthProvider';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// export default useAuth;

