import { Order } from "../../domain/model/order";
import { Product } from "../../domain/model/product";
import { User } from "../../domain/model/user";
import { GetUserOrderUsecase } from "../getUserOrder.usecase";

describe('GetUserOrderUsecase', () => {

  let orderRepository: any;
  let productRepository: any;
  let userRepository: any;
  let getUserOrderUsecase: GetUserOrderUsecase;

  beforeEach(() => {
    // Create a mock repository
    orderRepository = {
      findAllByUserId: jest.fn(),
    };

    productRepository = {
      findOneById: jest.fn(),
    };

    userRepository = {
      findOneById: jest.fn(),
    };

    getUserOrderUsecase = new GetUserOrderUsecase(orderRepository, productRepository, userRepository);
  });

  test('should return orders list of user', async () => {
    const fakeUser = {
      id: '1'
    } as User;

    const fakeOrders: Order[] = [{
      id: '1',
      userId: '1',
      productId: 'Product 1',
      totalPrice: 10,
      quantity: 5,
    }];

    const fakeProduct: Product = {
      id: '1',
      name: 'Product 1',
      price: 2,
      stock: 10
    };

    const expectedResult = [{
      id: '1',
      userId: '1',
      productId: 'Product 1',
      totalPrice: 10,
      quantity: 5,
      productName: 'Product 1',
      productPrice: 2,
    }];

    userRepository.findOneById.mockResolvedValue(fakeUser);
    orderRepository.findAllByUserId.mockResolvedValue(fakeOrders);
    productRepository.findOneById.mockResolvedValue(fakeProduct);

    const result = await getUserOrderUsecase.execute('1');
    expect(result).toEqual(expectedResult);

  });

  test('should throw error when user not found', () => {
    const fakeUser = undefined;

    userRepository.findOneById.mockReturnValue(fakeUser);

    expect(getUserOrderUsecase.execute('1111')).rejects.toThrow('User not found');

  });
});