import express, { Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./infrastructure/routes/user.route";
import { accessLogger } from "./infrastructure/middlewares/logger";

dotenv.config();
const app = express();

app.use(accessLogger);
app.use(express.json());

app.use("/v1/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World" });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
