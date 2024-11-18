import { AuthResponse } from '../../types/supabase';
import { supabase } from '../libs/supabaseClient';

export const signUp = async (email: string, password: string): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,    
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data };
};