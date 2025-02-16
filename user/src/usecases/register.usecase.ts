import { v4 as uuidv4 } from "uuid";

import { UserRepositoryInterface } from "../domain/repositories/userRepository.interface";

export class RegisterUsecase {

  constructor(private userRepository: UserRepositoryInterface) { }

  execute = (email: string, password: string) => {

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    if (!email.includes("@")) {
      throw new Error("Invalid email format");
    }


    const existingUser = this.userRepository.findOneByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
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

    this.userRepository.createOne(newUser);

    console.log(`Sending welcome email to ${email}`);

    return newUser;
  };


}