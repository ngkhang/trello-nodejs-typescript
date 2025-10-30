import { StatusCodes } from 'http-status-codes';

class ApiError extends Error {
  public statusCode: number;

  constructor(statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR, message = 'Something went wrong') {
    super(message);

    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
    this.name = 'ApiError';
  }
}

export default ApiError;
