export interface CustomResponseInterface<T = any> {
  status: 'success' | 'error' | 'fail';
  message?: string;
  data?: T;
  timestamp?: Date | string;
}

// Tipos específicos para diferentes estados
export type SuccessResponse<T> = {
  status: 'success';
  message?: string;
  data: T;
  timestamp?: Date | string;
};

export type ErrorResponse = {
  status: 'error';
  message: string;
  errors?: unknown;
  code?: string;
  details?: unknown;
  timestamp?: Date | string;
};

export type FailResponse = {
  status: 'fail';
  message: string;
  data?: unknown;
  timestamp?: Date | string;
};

export interface PaginatedResponse<T> {
  status: 'success';
  message?: string;
  data: T[];
  total: number;
  pagina: number;
  porPagina: number;
  totalPaginas: number;
  timestamp?: Date | string;
}