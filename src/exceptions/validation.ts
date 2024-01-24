import { HttpException } from "./root";

export class UnprocessableEntityException extends HttpException {
  constructor(message: string, error: any, errorCode: number) {
    super(message, errorCode, 422, error);
  }
}
