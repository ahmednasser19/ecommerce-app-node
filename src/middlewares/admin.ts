import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthrized";
import { ErrorCode } from "../exceptions/root";

const adminMiddleware: any = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user.role === "ADMIN") {
    next();
  } else {
    next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
  }
};

export default adminMiddleware;
