import * as uuid from "uuid";

import { RegisterUsecase } from "../register.usecase";

jest.mock('uuid');
jest.useFakeTimers().setSystemTime(new Date('2025-02-16'));

describe('GetUserOrderUsecase', () => {

  let userRepository: any;
  let registerUsecase: RegisterUsecase;

  beforeEach(() => {
    // Create a mock repository
    userRepository = {
      findOneByEmail: jest.fn(),
      createOne: jest.fn(),
    };

    registerUsecase = new RegisterUsecase(userRepository);
  });

  test('should return list of detailed orders', () => {
    const email = 'example@gmail.com';
    const password = '123456';

    const expectedResult = {
      id: 'uuid',
      email,
      password,
      firstName: "",
      lastName: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      role: "user" as const,
    };

    // create a mock uuid
    jest.spyOn(uuid, 'v4').mockReturnValue("uuid" as any);

    userRepository.findOneByEmail.mockReturnValue(undefined);

    const result = registerUsecase.execute(email, password);
    expect(result).toEqual(expectedResult);

  });

  test('should throw error when user already exists', () => {
    const email = 'example@gmail.com';
    const password = '123456';

    const fakeUser = {
      id: 1,
      email,
      password,
    };

    userRepository.findOneByEmail.mockReturnValue(fakeUser);

    expect(() => registerUsecase.execute(email, password)).toThrow('User already exists');

  });

  test('should throw error when there is no email or password', () => {
    const email = '';
    const password = '';

    expect(() => registerUsecase.execute(email, password)).toThrow('Email and password are required');

  });

  test('should throw error when email is invalid', () => {
    const email = 'examplegmail.com';
    const password = '123456';

    expect(() => registerUsecase.execute(email, password)).toThrow('Invalid email format');

  });
});