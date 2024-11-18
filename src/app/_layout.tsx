import '@/src/styles/global.css';
import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import App from './App';

export default function RootLayout() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}