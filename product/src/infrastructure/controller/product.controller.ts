import { Request, Response } from "express";
import { GetAllProductsUsecase } from "../../usecases/getAllProduct.usecase";
import { GetProductDetailsUsecase } from "../../usecases/getProductDetails.usecase";
import { UpdateProductDetailsUsecase } from "../../usecases/updateProductDetails.usecase";

export class ProductController {

  constructor(
    private getAllProductsUsecase: GetAllProductsUsecase,
    private getProductDetailsUsecase: GetProductDetailsUsecase,
    private updateProductDetailsUsecase: UpdateProductDetailsUsecase,
  ) { }

  getAllProduct = (req: Request, res: Response) => {
    const products = this.getAllProductsUsecase.execute();
    res.json(products);
  };

  getProductDetails = (req: Request, res: Response) => {
    try {
      const { productId } = req.params;

      const product = this.getProductDetailsUsecase.execute(productId);
      res.json(product);

    } catch (error: any) {
      if (error.message === "Product not found") {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };

  updateProductDetails = (req: Request, res: Response) => {
    const product = req.body;

    this.updateProductDetailsUsecase.execute(product);

    res
      .status(201)
      .json({ message: "Product updated successfully", });
  };
}