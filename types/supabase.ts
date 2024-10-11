export interface AuthResponse {
  success: boolean;
  error?: string;
  data?: any; // Pode ser ajustado conforme o tipo de dados que deseja retornar
}