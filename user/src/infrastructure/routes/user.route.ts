import express from "express";

import { UserController } from "../controller/user.controller";
import { RegisterUsecase } from "../../usecases/register.usecase";
import { GetUserOrderUsecase } from "../../usecases/getUserOrder.usecase";
import { UserRepository } from "../repositories/user.repository";
import { OrderRepository } from "../repositories/order.repository";
import { ProductRepository } from "../repositories/product.repository";

const router = express.Router();

// inject the instance here
// repositories
const orderRepository = new OrderRepository();
const productRepository = new ProductRepository();
const userRepository = new UserRepository();

// usecases
const registerUsecase = new RegisterUsecase(userRepository);
const getUserOrderUsecase = new GetUserOrderUsecase(orderRepository, productRepository, userRepository);

// controllers
const userController = new UserController(registerUsecase, getUserOrderUsecase);

router.post("/register", userController.register);
router.get("/:userId/orders", userController.getUserOrders);

export default router;
