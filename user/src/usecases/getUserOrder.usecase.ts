import { OrderRepositoryInterface } from "../domain/repositories/orderRepository.interface";
import { ProductRepositoryInterface } from "../domain/repositories/productRepository.interface";
import { UserRepositoryInterface } from "../domain/repositories/userRepository.interface";

export class GetUserOrderUsecase {
  constructor(
    private orderRepository: OrderRepositoryInterface,
    private productRepository: ProductRepositoryInterface,
    private userRepository: UserRepositoryInterface,
  ) { }

  execute = async (userId: string) => {

    const user = this.userRepository.findOneById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const userOrders = await this.orderRepository.findAllByUserId(userId);

    const promiseDetailedOrders = userOrders.map(async (order) => {
      const product = await this.productRepository.findOneById(order.productId);
      return {
        ...order,
        productName: product ? product.name : "Unknown",
        productPrice: product ? product.price : 0,
      };
    });

    const detailedOrders = await Promise.all(promiseDetailedOrders);

    return detailedOrders;
  };

}