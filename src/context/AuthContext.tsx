import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface AuthContextData {
  userToken: string | null;
  loading: boolean;
  signIn: (token: string, userId: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync('userToken');
        if (storedToken) {
          setUserToken(storedToken);
        }
      } catch (error) {
        console.error('Erro ao carregar o token:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStorageData();
  }, []);

  const signIn = async (token: string, userId: string) => {
    try {
      setLoading(true);
      await SecureStore.setItemAsync('userToken', token);
      await SecureStore.setItemAsync('userID', userId)
      setUserToken(token);
    } catch (error) {
      console.error('Erro ao salvar o token:', error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await SecureStore.setItemAsync('userToken', '');
      setUserToken(null);
    } catch (error) {
      console.error('Erro ao remover o token:', error);
    } finally {
      setLoading(false);
    } 
  };

  return <AuthContext.Provider value={{ userToken, loading, signIn, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
}
