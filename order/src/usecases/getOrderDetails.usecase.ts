import { OrderRepositoryInterface } from "../domain/repositories/orderRepository.interface";

export class GetOrderDetailsUsecase {
  constructor(private orderRepository: OrderRepositoryInterface) { }

  execute = (orderId: string) => {
    const order = this.orderRepository.findOneById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  };
}