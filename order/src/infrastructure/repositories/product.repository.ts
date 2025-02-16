import axios from 'axios';

import { ProductRepositoryInterface } from '../../domain/repositories/productRepository.interface';
import { Product } from '../../domain/model/product';

export class ProductRepository implements ProductRepositoryInterface {

  findOneById = async (productId: string) => {
    const apiUrl = process.env.PRODUCT_URL;
    const fullUrl = `${apiUrl}/${productId}`;

    const result = await axios.get(fullUrl);
    return result.data;
  };

  updateOne = async (product: Product) => {
    const apiUrl = process.env.PRODUCT_URL;
    const fullUrl = `${apiUrl}/${product.id}`;

    await axios.put(fullUrl, product);
  };
}