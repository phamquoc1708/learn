import { HttpStatus } from '@nestjs/common';

export const Errors = {
  OBJECT_NOT_FOUND: {
    error: 'OBJECT_NOT_FOUND',
    message: 'Object not found',
    httpStatus: HttpStatus.NOT_FOUND,
  },
  INVALID_DATA_FOR_RESPONSE: {
    error: 'INVALID_DATA_FOR_RESPONSE',
    message: 'the type of data is not object',
    httpStatus: HttpStatus.BAD_REQUEST,
  },
};
