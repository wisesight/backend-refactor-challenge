import { Order } from "../model/order";

export interface OrderRepositoryInterface {
  findAllByUserId(userId: string): Promise<Order[]>
}