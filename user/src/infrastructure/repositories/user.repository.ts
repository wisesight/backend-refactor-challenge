import { User } from "../../domain/model/user";
import { UserRepositoryInterface } from "../../domain/repositories/userRepository.interface";

const users: User[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    role: "user",
  },
]; // pretend this is a mongoDB collection

export class UserRepository implements UserRepositoryInterface {

  updateOne(user: User) {
    const index = users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      users[index] = user;
    }
  }

  findOneById(id: string) {
    // let's pretend this is a mongoDB findOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    return users.find((u) => u.id === id);
  }

  findOneByEmail(email: string) {
    // let's pretend this is a mongoDB findOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    return users.find((u) => u.email === email);
  }

  createOne(user: User) {
    // let's pretend this is a mongoDB createOne
    // you can move things around, but you don't have to implement real database operations, just pretend
    users.push(user);
  }
}