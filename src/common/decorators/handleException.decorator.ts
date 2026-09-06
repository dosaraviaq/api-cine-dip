import { HttpException, Logger } from '@nestjs/common';
import { ResponseUtils } from '../utils/Response.utils';

export function HandleException(defaultErrorMessage: string) {
  const logger = new Logger('HandleException');
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error: unknown) {
        const { statusCode, response } = ResponseUtils.fromError(
          error,
          defaultErrorMessage,
        );
        // capturar el error y ponerlo en le logger
         logger.error(
          `Error en ${target.constructor.name}.${propertyKey}`,
          {
            error,
            response,
            statusCode,
          },
        );
        throw new HttpException(response, statusCode);
      }
    };
    return descriptor;
  };
}