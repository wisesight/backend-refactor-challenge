import { User } from "../model/user"

export interface UserRepositoryInterface {
  updateOne(user: User): void

  findOneById(id: string): User | undefined

  findOneByEmail(email: string): User | undefined

  createOne(user: User): void
}