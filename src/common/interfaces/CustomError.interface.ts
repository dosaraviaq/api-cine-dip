import { ErrorResponse } from './CustomResponse.interface';

export interface CustomError {
  status?: number;
  message?: string;
  response?: any;
  errors?: unknown;
  code?: string;
  details?: unknown;
}

export function isCustomError(error: unknown): error is CustomError {
  return (
    typeof error === 'object' &&
    error !== null &&
    ('status' in error || 'message' in error || 'code' in error)
  );
}

// Mantener la función handleError
export function handleError(
  error: unknown,
  defaultMessage: string,
): { statusCode: number; message: string; errors?: unknown } {
  if (isCustomError(error)) {
    return {
      statusCode: error.status || 500,
      message: error.message || defaultMessage,
      errors: error.response?.errors,
    };
  }

  if (error instanceof Error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }

  return {
    statusCode: 500,
    message: defaultMessage,
  };
}

// Función adicional para crear ErrorResponse desde handleError
export function createErrorResponseFromHandle(
  error: unknown,
  defaultMessage: string,
): ErrorResponse {
  const {
    // statusCode,
    message,
  } = handleError(error, defaultMessage);
  return {
    status: 'error',
    message,
    timestamp: new Date(),
  };
}