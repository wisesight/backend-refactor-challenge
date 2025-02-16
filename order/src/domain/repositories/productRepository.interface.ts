import { Product } from "../model/product";

export interface ProductRepositoryInterface {
  findOneById(productId: string): Promise<Product>;

  updateOne(product: Product): Promise<void>;
}