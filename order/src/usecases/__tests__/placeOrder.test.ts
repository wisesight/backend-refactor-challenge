import * as uuid from "uuid";

import { Order } from "../../domain/model/order";
import { PlaceOrderUsecase } from "../placeOrder.usecase";
import { Product } from "../../domain/model/product";

jest.mock('uuid');


describe('PlaceOrderUsecase', () => {
  let orderRepository: any;
  let productRepository: any;
  let getOrdersUsecase: PlaceOrderUsecase;

  beforeEach(() => {
    // Create a mock repository
    orderRepository = {
      createOne: jest.fn()
    };
    productRepository = {
      findOneById: jest.fn(),
      updateOne: jest.fn()
    };
    getOrdersUsecase = new PlaceOrderUsecase(orderRepository, productRepository);
  });

  test('should return new order and call function correctly', async () => {
    const fakeOrder: Order = {
      id: '1',
      userId: '1',
      productId: "1",
      quantity: 2,
      totalPrice: 20
    };
    const fakeProduct: Product = {
      id: "1",
      name: "Product 1",
      price: 10,
      stock: 5
    };

    jest.spyOn(uuid, 'v4').mockReturnValue("1" as any);
    productRepository.findOneById.mockResolvedValue(fakeProduct);

    const result = await getOrdersUsecase.execute(fakeOrder.userId, fakeOrder.productId, fakeOrder.quantity);
    expect(result).toEqual(fakeOrder);
    expect(orderRepository.createOne).toHaveBeenCalled();
    expect(productRepository.findOneById).toHaveBeenCalled();
    expect(productRepository.updateOne).toHaveBeenCalled();
  });
});