import { v4 as uuidv4 } from "uuid";

import { OrderRepositoryInterface } from "../domain/repositories/orderRepository.interface";
import { ProductRepositoryInterface } from "../domain/repositories/productRepository.interface";

export class PlaceOrderUsecase {
  constructor(
    private orderRepository: OrderRepositoryInterface,
    private productRepository: ProductRepositoryInterface
  ) { }

  execute = async (userId: string, productId: string, quantity: number) => {
    if (!userId || !productId || !quantity || quantity <= 0) {
      throw new Error("Invalid order details");
    }

    const product = await this.productRepository.findOneById(productId);

    if (product.stock < quantity) {
      throw new Error("Insufficient stock");
    }

    const totalPrice = product.price * quantity;
    const newOrder = { id: uuidv4(), userId, productId, quantity, totalPrice };

    this.orderRepository.createOne(newOrder);
    product.stock -= quantity;
    await this.productRepository.updateOne(product);

    return newOrder;

  };
}