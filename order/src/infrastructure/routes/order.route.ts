import express from "express";

import { OrderController } from "../controller/order.controller";
import { PlaceOrderUsecase } from "../../usecases/placeOrder.usecase";
import { GetOrdersUsecase } from "../../usecases/getOrders.usecase";
import { GetOrderDetailsUsecase } from "../../usecases/getOrderDetails.usecase";
import { OrderRepository } from "../repositories/order.repository";
import { ProductRepository } from "../repositories/product.repository";

const router = express.Router();

// inject the instance here
// repositories
const orderRepository = new OrderRepository();
const productRepository = new ProductRepository();

// usecases
const placeOrderUsecase = new PlaceOrderUsecase(orderRepository, productRepository);
const getOrdersUsecase = new GetOrdersUsecase(orderRepository);
const getOrderDetailUsecase = new GetOrderDetailsUsecase(orderRepository);

// controllers
const orderController = new OrderController(placeOrderUsecase, getOrdersUsecase, getOrderDetailUsecase);

router.post("/", orderController.placeOrder);
router.get("/", orderController.getOrders);
router.get("/:orderId", orderController.getOrderDetails);

export default router;
