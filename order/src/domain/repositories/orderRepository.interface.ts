import { Order } from "../model/order"

export interface OrderRepositoryInterface {
  updateOne(order: Order): void

  findOneById(id: string): Order | undefined

  findAll(): Order[]

  createOne(order: Order): void

  findAllByUserId(userId: string): Order[]
}