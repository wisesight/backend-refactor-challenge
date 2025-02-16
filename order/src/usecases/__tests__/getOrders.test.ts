import { Order } from "../../domain/model/order";
import { GetOrdersUsecase } from "../getOrders.usecase";

describe('GetOrdersUsecase', () => {
  let orderRepository: any;
  let getOrdersUsecase: GetOrdersUsecase;

  beforeEach(() => {
    // Create a mock repository
    orderRepository = {
      findAll: jest.fn(),
      findAllByUserId: jest.fn()
    };
    getOrdersUsecase = new GetOrdersUsecase(orderRepository);
  });

  test('should return all orders', () => {
    const fakeOrder: Order[] = [
      {
        id: '1',
        userId: '1',
        productId: "1",
        quantity: 10,
        totalPrice: 100
      },
      {
        id: '2',
        userId: '2',
        productId: "1",
        quantity: 10,
        totalPrice: 100
      }
    ];

    orderRepository.findAll.mockReturnValue(fakeOrder);

    const result = getOrdersUsecase.execute(undefined);
    expect(result).toEqual(fakeOrder);
    expect(orderRepository.findAll).toHaveBeenCalled();
  });

  test('should return list of orders by user id', () => {
    const fakeOrder: Order[] = [
      {
        id: '1',
        userId: '1',
        productId: "1",
        quantity: 10,
        totalPrice: 100
      }
    ];

    orderRepository.findAllByUserId.mockReturnValue(fakeOrder);

    const result = getOrdersUsecase.execute("1");
    expect(result).toEqual(fakeOrder);
    expect(orderRepository.findAllByUserId).toHaveBeenCalled();
  });
});