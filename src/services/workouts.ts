import { WorkoutResponse } from '@/types/supabase';
import * as SecureStore from 'expo-secure-store';
import { supabase } from '../libs/supabaseClient';

export const insertWorkout = async (  description: string, dayOfTheWeek: string): Promise<WorkoutResponse> => {

  const user_id = await SecureStore.getItemAsync('userID')
  
  const { data, error } = await supabase
  .from('treinos')
  .insert([
    {
      description,
      dayOfTheWeek,
      user_id
    }
  ])

  const message = error?.message

  if (message) {
    return { success: false, errorMessage: message}
  }

  if (data) {
    return { success: true, data }
  }

  return {success: false}
};

export const selectByUserId = async ():Promise<WorkoutResponse> => {
  const user_id = await SecureStore.getItemAsync('userID')

  const { data: data, error } = await supabase
  .from('treinos')
  .select("*")
  .eq('user_id', user_id)

  const message = error?.message

  if (message) {
    return { success: false, errorMessage: message}
  }

  if (data) {
    return { success: true, data }
  }

  return {success: false}
}


export const deleteWorkout = async (id: string):Promise<WorkoutResponse> => {
  const { error } = await supabase
  .from('treinos')
  .delete()
  .eq('id', id)

  const message = error?.message

  if (message) {
    return { success: false, errorMessage: message}
  }

  return {success: true}
}