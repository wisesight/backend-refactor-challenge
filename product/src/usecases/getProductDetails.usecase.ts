import { ProductRepositoryInterface } from "../domain/repositories/productRepository.interface";

export class GetProductDetailsUsecase {
  constructor(private productRepository: ProductRepositoryInterface) { }

  execute = (productId: string) => {
    const product = this.productRepository.findOneById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  };
}