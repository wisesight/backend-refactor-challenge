import { Request, Response } from "express";
import { PlaceOrderUsecase } from "../../usecases/placeOrder.usecase";
import { GetOrdersUsecase } from "../../usecases/getOrders.usecase";
import { GetOrderDetailsUsecase } from "../../usecases/getOrderDetails.usecase";

export class OrderController {

  constructor(
    private placeOrderUsecase: PlaceOrderUsecase,
    private getOrdersUsecase: GetOrdersUsecase,
    private getOrderDetailsUsecase: GetOrderDetailsUsecase,
  ) { }

  placeOrder = async (req: Request, res: Response) => {
    try {
      const { userId, productId, quantity } = req.body;

      const newOrder = await this.placeOrderUsecase.execute(userId, productId, quantity);

      res
        .status(201)
        .json({ message: "Order placed successfully", order: newOrder });

    } catch (error: any) {
      if (error.response?.data) {
        res.status(400).json(error.response?.data);
      } else if (error.message) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };

  getOrders = (req: Request, res: Response) => {
    const { userId } = req.query;

    const orders = this.getOrdersUsecase.execute(userId as string);

    res.json(orders);
  };

  getOrderDetails = (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;

      const order = this.getOrderDetailsUsecase.execute(orderId);

      res.json(order);
    } catch (error: any) {
      if (error.message === "Order not found") {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }

  };

}