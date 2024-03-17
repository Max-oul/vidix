//imoort service here
import { describe, expect, jest, it } from "@jest/globals";
import { DatabaseService } from "../config/db";
import { UserService } from "../services/UserService";
import { Container } from "typedi";

jest.mock("../config/db", () => ({
    DatabaseService: jest.fn().mockImplementation(() => ({
        getClient: jest.fn().mockReturnValue({
            table: jest.fn().mockReturnThis(),
            insert: jest.fn().mockResolvedValue('mockedUser' as never),
        }),
    })),
}));

describe('UserService', () => {
    let userService: UserService;
    beforeEach(() => {
        Container.set(UserService, new UserService(new DatabaseService()));
        userService = Container.get(UserService);
    });
    test("Create a method should insert a user", async() => {
        //Arrange
        const f_name = 'John';
        const l_name = 'Doe';
        const email = 'john@example.com';
        const password = 'password';
        const role = { isAdmin: false };
        const user = await userService.create(f_name, l_name, email, password, role);
        expect(user).toBe('mockedUser');
    })
    test("Create a method should handle errors", async() => {
        //Arrange
        const f_name = 'John';
        const l_name = 'Doe';
        const email = 'invalid email';
        const password = 'password';
        const role = { isAdmin: false };
        //Act
        let error: Error | undefined;
        try {
            await userService.create(f_name, l_name, email, password, role);
        } catch (e) {
            error = e as Error;
        }
        //Assert
        expect(error).toBeDefined();
        expect(error?.message).toBe('Invalid email');
      });

      test("Create a method should handle passwords that don't meet complexity requirements", async() => {
        //Arrange
        const f_name = 'John';
        const l_name = 'Doe';
        const email = 'john@example.com';
        const password = 'short'; // password that doesn't meet complexity requirements
        const role = { isAdmin: false };
        //Act
        let error: Error | undefined;
        try {
            await userService.create(f_name, l_name, email, password, role);
        } catch (e) {
            error = e as Error;
        }
        //Assert
        expect(error).toBeDefined();
        expect(error?.message).toBe('Invalid password');
    });
})
