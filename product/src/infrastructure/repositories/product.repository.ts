import { Product } from "../../domain/model/product";
import { ProductRepositoryInterface } from "../../domain/repositories/productRepository.interface";


const products: Product[] = [
  {
    id: "1",
    name: "Product 1",
    price: 100,
    stock: 3,
  },
  {
    id: "2",
    name: "Product 2",
    price: 200,
    stock: 5,
  },
]; // pretend this is a mongoDB collection

export class ProductRepository implements ProductRepositoryInterface {
  updateOne = (product: Product) => {
    // let's pretend this is a mongoDB updateOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    const index = products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      products[index] = product;
    }
  };
  findOneById = (id: string) => {
    // let's pretend this is a mongoDB findOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    return products.find((p) => p.id === id);
  };

  findAll = () => {
    return products;
  };

  createOne = (product: Product) => {
    // let's pretend this is a mongoDB createOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    products.push(product);
  };
}