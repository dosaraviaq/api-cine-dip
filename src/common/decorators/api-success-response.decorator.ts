import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

/** Documenta el formato que devuelve ResponseUtils. */
export function ApiSuccessResponse(
  model: Type<unknown>,
  description: string,
  status = 200,
  paginated = false,
) {
  return applyDecorators(
    ApiExtraModels(model),
    ApiResponse({
      status,
      description,
      schema: {
        type: 'object',
        required: [
          'status',
          'message',
          'data',
          'timestamp',
          ...(paginated
            ? ['total', 'pagina', 'porPagina', 'totalPaginas']
            : []),
        ],
        properties: {
          status: { type: 'string', enum: ['success'], example: 'success' },
          message: { type: 'string', example: description },
          data: paginated
            ? { type: 'array', items: { $ref: getSchemaPath(model) } }
            : { $ref: getSchemaPath(model) },
          timestamp: { type: 'string', format: 'date-time' },
          ...(paginated
            ? {
                total: { type: 'integer' as const, example: 25 },
                pagina: { type: 'number' as const, example: 1 },
                porPagina: { type: 'number' as const, example: 10 },
                totalPaginas: { type: 'integer' as const, example: 3 },
              }
            : {}),
        },
      },
    }),
  );
}
