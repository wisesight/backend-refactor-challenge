// * UUID
import { v4 as uuidv4 } from 'uuid'

// * Use case config interface
import type { UseCase } from '../configuration/useCase'

// * Adapter inbound port interface
import type { CreateOrderPort } from '../ports/inbound/http/rest/order/createOrderPort'

// * Adapter outbound repository
import type { OrderRepositoryMongoDBImpl } from '../../adapters/outbound/db/mongoDB/orderRepositoryMongoDBImpl'

// * Adapter outbound API
import type { ProductApiImpl } from '../../adapters/outbound/gatewayAPI/productApi/productApiImpl'

export class CreateOrderUseCase implements UseCase<CreateOrderPort.Body, CreateOrderPort.Result> {
  constructor(
    private readonly productApiImpl: ProductApiImpl,
    private readonly orderRepositoryImpl: OrderRepositoryMongoDBImpl,
  ) {}

  async execute(reqBody: CreateOrderPort.Body): Promise<CreateOrderPort.Result> {
    try {
      const { userId, productId, quantity } = reqBody

      if (!userId || !productId || !quantity || quantity <= 0) {
        return {
          data: null,
          code: '0001', // Just mock
          message: 'Invalid order details',
        }
      }

      const product = await this.productApiImpl.findById(productId)
      if (!product) {
        return {
          data: null,
          code: '0002', // Just mock
          message: 'Product not found',
        }
      }

      if (product.stock < quantity) {
        return {
          data: null,
          code: '0003', // Just mock
          message: 'Insufficient stock',
        }
      }

      const totalPrice = product.price * quantity
      const newOrder = { id: uuidv4(), userId, productId, quantity, totalPrice }

      this.orderRepositoryImpl.create(newOrder)

      product.stock -= quantity

      await this.productApiImpl.update(product)

      return {
        data: newOrder,
        code: '0000', // Just mock
        message: 'Order placed successfully',
      }
    } catch (e: unknown) {
      let message = 'An error occurred'

      if (typeof e === 'string') {
        message = e
      } else if (e instanceof Error) {
        message = e.message
      }

      return {
        data: null,
        code: 'E500', // Just mock
        message,
      }
    }
  }
}
