import { prismaClient } from "..";
import { Request, Response, NextFunction } from "express";
import { CreateProductSchema } from "../schema/products";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //create a a validator for this request
  // CreateProductSchema.parse(req.body),

  const product = await prismaClient.product.create({
    data: {
      ...req.body,
      tags: req.body.tags.join(","),
    },
  });
  res.json(product);
};
