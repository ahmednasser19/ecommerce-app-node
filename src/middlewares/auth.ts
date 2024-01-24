import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthrized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";
const authMiddleware: any = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  //1. extract the token from header
  const token = req.headers.authorization;

  if (!token) {
    next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
  }

  //2. verify the token
  try {
    //3. if verified, extract the user id from the token
    const payload = jwt.verify(token!, JWT_SECRET) as any;
    //4. find the user from the database
    const user = await prismaClient.user.findFirst({
      where: { id: payload.userId },
    });

    if (!user) {
      next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
    }
    //5. attach the user object to the request object
    req.user = user;

    next();
  } catch (error) {
    next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
  }
  //6. call next()
};

export default authMiddleware;
