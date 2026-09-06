import {
  SuccessResponse,
  ErrorResponse,
  FailResponse,
  PaginatedResponse,
} from '../interfaces/CustomResponse.interface';
import { handleError } from '../interfaces/CustomError.interface';

export class ResponseUtils {
  static success<T>(data: T, message?: string): SuccessResponse<T> {
    return {
      status: 'success',
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  }

   static paginated<T>(
    data: T[],
    total: number,
    pagina: number,
    porPagina: number,
    message = 'Consulta exitosa',
  ): PaginatedResponse<T> {
    return {
      status: 'success',
      message,
      data,
      total,
      pagina,
      porPagina,
      totalPaginas: Math.ceil(total / porPagina),
      timestamp: new Date().toISOString(),
    };
  }

  static error(
    message: string,
    code?: string,
    details?: unknown,
  ): ErrorResponse {
    return {
      status: 'error',
      message,
      code,
      details,
      timestamp: new Date().toISOString(),
    };
  }

  static fail(message: string, data?: unknown): FailResponse {
    return {
      status: 'fail',
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  // Nueva función que integra handleError
  static fromError(
    error: unknown,
    defaultMessage: string,
  ): { response: ErrorResponse; statusCode: number } {
    const { statusCode, message, errors } = handleError(error, defaultMessage);
    return {
      response: {
        status: 'error',
        message,
        errors,
        timestamp: new Date().toISOString(),
      },
      statusCode,
    };
  }
}