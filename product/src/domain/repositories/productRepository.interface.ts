import { Product } from "../model/product";

export interface ProductRepositoryInterface {
  updateOne(product: Product): void

  findOneById(id: string): Product | undefined

  findAll(): Product[]

  createOne(product: Product): void
}