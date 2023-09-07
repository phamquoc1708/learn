import { HttpStatus } from '@nestjs/common';

export interface ErrorResponse {
  message: string;
  error?: string;
  httpStatus?: number;
  data?: Record<string, any>;
}

export class AppException extends Error {
  public error;
  public httpStatus;
  public data;

  constructor(params: ErrorResponse) {
    const initData: ErrorResponse = {
      error: 'INTERNAL_SERVER_ERROR',
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      data: {},
      message: 'Server error',
      ...params,
    };

    super(initData.message);
    this.error = initData.error;
    this.httpStatus = initData.error;
    this.data = initData.error;
  }
}
