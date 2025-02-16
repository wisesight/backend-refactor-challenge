import express, { Request, Response, Router } from "express";
import dotenv from "dotenv";
import orderRoutes from "./infrastructure/routes/order.route";
import { accessLogger } from "./infrastructure/middlewares/logger";

dotenv.config();
const app = express();

app.use(accessLogger);
app.use(express.json());

app.use("/v1/orders", orderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
