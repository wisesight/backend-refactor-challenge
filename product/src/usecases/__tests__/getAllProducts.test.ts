import { Product } from "../../domain/model/product";
import { GetAllProductsUsecase } from "../getAllProduct.usecase";

describe('GetAllProductsUsecase', () => {

  let productRepository: any;
  let getAllProductsUsecase: GetAllProductsUsecase;

  beforeEach(() => {
    // Create a mock repository
    productRepository = {
      findAll: jest.fn(),
    };
    getAllProductsUsecase = new GetAllProductsUsecase(productRepository);
  });

  test('should return all products', () => {
    const fakeProducts: Product[] = [{
      id: '1',
      name: 'Product 1',
      price: 10,
      stock: 5,
    }];

    productRepository.findAll.mockReturnValue(fakeProducts);

    const result = getAllProductsUsecase.execute();
    expect(result).toEqual(fakeProducts);

  });
});