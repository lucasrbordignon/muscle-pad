import { AuthResponse } from '../../types/supabase';
import { supabase } from '../libs/supabaseClient';

export const recoverPassword = async (email: string): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data };
};
