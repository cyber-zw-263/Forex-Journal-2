import { NextResponse } from 'next/server';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const apiResponse = {
  success: <T,>(data: T, pagination?: { page: number; limit: number; total: number }) => {
    const response: ApiResponse<T> = { success: true, data };
    if (pagination) {
      response.pagination = {
        ...pagination,
        totalPages: Math.ceil(pagination.total / pagination.limit),
      };
    }
    return NextResponse.json(response);
  },

  error: (code: string, message: string, details?: Record<string, unknown>, status = 400) => {
    const response: ApiResponse = {
      success: false,
      error: { code, message, details },
    };
    return NextResponse.json(response, { status });
  },

  validationError: (details: Record<string, unknown>) => {
    return apiResponse.error('VALIDATION_ERROR', 'Invalid input', details, 400);
  },

  notFound: () => {
    return apiResponse.error('NOT_FOUND', 'Resource not found', undefined, 404);
  },

  unauthorized: () => {
    return apiResponse.error('UNAUTHORIZED', 'Unauthorized', undefined, 401);
  },

  forbidden: () => {
    return apiResponse.error('FORBIDDEN', 'Access denied', undefined, 403);
  },

  serverError: (message = 'Internal server error', details?: Record<string, unknown>) => {
    return apiResponse.error('SERVER_ERROR', message, details, 500);
  },

  unavailable: () => {
    return apiResponse.error('SERVICE_UNAVAILABLE', 'Database service unavailable. Using demo data.', undefined, 503);
  },
};
