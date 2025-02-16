import { Product } from "../../domain/model/product";
import { GetProductDetailsUsecase } from "../getProductDetails.usecase";
import { UpdateProductDetailsUsecase } from "../updateProductDetails.usecase";

describe('UpdateProductDetailsUsecase', () => {

  let productRepository: any;
  let updateProductDetailsUsecase: UpdateProductDetailsUsecase;

  beforeEach(() => {
    // Create a mock repository
    productRepository = {
      updateOne: jest.fn(),
    };
    updateProductDetailsUsecase = new UpdateProductDetailsUsecase(productRepository);
  });

  test('should call update-product function correctly', () => {
    const fakeProducts: Product = {
      id: '1',
      name: 'Product 1',
      price: 10,
      stock: 5,
    };

    productRepository.updateOne.mockReturnValue(fakeProducts);

    updateProductDetailsUsecase.execute(fakeProducts);
    expect(productRepository.updateOne).toHaveBeenCalled();

  });
});