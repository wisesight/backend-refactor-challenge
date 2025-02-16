import { Order } from "../../domain/model/order";
import { GetOrderDetailsUsecase } from "../getOrderDetails.usecase";

describe('GetOrderDetailsUsecase', () => {

  let orderRepository: any;
  let getOrderDetailsUsecase: GetOrderDetailsUsecase;

  beforeEach(() => {
    // Create a mock repository
    orderRepository = {
      findOneById: jest.fn(),
    };
    getOrderDetailsUsecase = new GetOrderDetailsUsecase(orderRepository);
  });

  test('should return order detail', () => {
    const fakeOrder: Order = {
      id: '1',
      userId: '1',
      productId: "1",
      quantity: 10,
      totalPrice: 100
    };

    orderRepository.findOneById.mockReturnValue(fakeOrder);

    const result = getOrderDetailsUsecase.execute('1');
    expect(result).toEqual(fakeOrder);

  });

  test('should throw error when order not found', async () => {
    const fakeOrder = undefined;

    orderRepository.findOneById.mockReturnValue(fakeOrder);

    expect(() => getOrderDetailsUsecase.execute('1')).toThrow('Order not found');
  });
});