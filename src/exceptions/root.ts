//message,status,code, error , the code

export class HttpException extends Error {
  public statusCode: number;
  public message: string;
  public errorCode: any;
  public errors: ErrorCode;

  constructor(
    message: string,
    errorCode: number,
    statusCode: number,
    error: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = error;
  }
}

export enum ErrorCode {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  PASSWORD_IS_INCORRECT = 1003,
  UNPROCESSABLE_ENTITY = 2001,
  INTERNAL_EXCEPTION = 3001,
  UNAUTHORIZED = 4001,
}
