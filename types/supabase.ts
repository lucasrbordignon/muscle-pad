import { TrainingSession } from "@/src/app/tabs/home";

export interface AuthResponse {
  success: boolean;
  error?: string;
  data?: any; // Pode ser ajustado conforme o tipo de dados que deseja retornar
}

export interface WorkoutResponse {
  success: boolean;
  error?: string;
  errorMessage?: string;
  data?: TrainingSession[]; // Pode ser ajustado conforme o tipo de dados que deseja retornar
}