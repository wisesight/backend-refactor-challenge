import { Product } from "../domain/model/product";
import { ProductRepositoryInterface } from "../domain/repositories/productRepository.interface";

export class UpdateProductDetailsUsecase {
  constructor(private productRepository: ProductRepositoryInterface) { }

  execute = (product: Product) => {
    this.productRepository.updateOne(product);
  };
}