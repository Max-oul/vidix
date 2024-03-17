import "reflect-metadata";
import { Service, Inject } from "typedi";
import { UserSchema } from "../Schema/UserSchema";
import { DatabaseService } from "../config/db";

@Service()
export class UserService {
  constructor(@Inject() private dbService: DatabaseService) {}

  public async create(
    f_name: string,
    l_name: string,
    email: string,
    password: string,
    role: object
  ) {
    if (!this.isValidEmail(email)) {
      throw new Error("Invalid email");
    }
    if (!this.isValidPassword(password)) {
        throw new Error("Invalid password");
      }
    const user = await (this.dbService.getClient() as any)
      .table(UserSchema)
      .insert({
        f_name,
        l_name,
        email,
        password,
        role,
      });
    return user;
  }

  private isValidEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  private isValidPassword(password: string) {
    if (password.length < 8) {
      return false;
    }
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
  }
}
