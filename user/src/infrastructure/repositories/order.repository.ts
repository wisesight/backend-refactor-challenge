import axios from "axios";
import { OrderRepositoryInterface } from "../../domain/repositories/orderRepository.interface";

export class OrderRepository implements OrderRepositoryInterface {

  findAllByUserId = async (userId: string) => {
    const apiUrl = process.env.ORDER_URL;
    const queryParams = {
      userId,
    };

    const queryString = new URLSearchParams(queryParams).toString();

    const fullUrl = `${apiUrl}?${queryString}`;

    const result = await axios.get(fullUrl);
    return result.data;
  };
}