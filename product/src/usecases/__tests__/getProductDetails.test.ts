import { Product } from "../../domain/model/product";
import { GetProductDetailsUsecase } from "../getProductDetails.usecase";

describe('GetProductDetailsUsecase', () => {

  let productRepository: any;
  let getProductDetailsUsecase: GetProductDetailsUsecase;

  beforeEach(() => {
    // Create a mock repository
    productRepository = {
      findOneById: jest.fn(),
    };
    getProductDetailsUsecase = new GetProductDetailsUsecase(productRepository);
  });

  test('should return all products', () => {
    const fakeProducts: Product = {
      id: '1',
      name: 'Product 1',
      price: 10,
      stock: 5,
    };

    productRepository.findOneById.mockReturnValue(fakeProducts);

    const result = getProductDetailsUsecase.execute(fakeProducts.id);
    expect(result).toEqual(fakeProducts);

  });

  test('should throw error when product not found', () => {
    const fakeProducts = undefined;

    productRepository.findOneById.mockReturnValue(fakeProducts);

    expect(() => getProductDetailsUsecase.execute('1111')).toThrow('Product not found');

  });
});