import { Slot, useRootNavigationState, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function App() {
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const { userToken, loading } = useAuth();

  useEffect(() => {    
    if (!navigationState?.key || loading) return;

    if (userToken) {
      router.replace('/tabs/home')  
    } else {
      router.replace('/auth/login')      
    }
      
  }, [navigationState?.key, userToken, loading]);

  return <Slot/>
}