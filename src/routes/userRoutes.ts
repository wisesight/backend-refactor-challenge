import express, { Request, Response } from "express";
import { createOne, findOneByEmail } from "../mongoDatabase/user";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();

router.post("/register", async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const existingUser = findOneByEmail(email);
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = {
    id: uuidv4(),
    email,
    password,
    firstName: "",
    lastName: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    role: "user" as const,
  };
  createOne(newUser);

  console.log(`Sending welcome email to ${email}`);

  res
    .status(201)
    .json({ message: "User registered successfully", user: newUser });
});

export default router;
