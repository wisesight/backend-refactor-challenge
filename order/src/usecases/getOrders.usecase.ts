import { OrderRepositoryInterface } from "../domain/repositories/orderRepository.interface";

export class GetOrdersUsecase {
  constructor(private orderRepository: OrderRepositoryInterface) { }

  execute = (userId: string | undefined) => {
    if (userId) {
      const orders = this.orderRepository.findAllByUserId(userId);
      return orders;
    } else {
      const orders = this.orderRepository.findAll();
      return orders;
    }
  };
}