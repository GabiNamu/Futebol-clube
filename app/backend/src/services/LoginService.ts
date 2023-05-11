import { compareSync } from 'bcryptjs';
import createTokenJWT from '../utils/jwtConfig';
import UserModel from '../database/models/UserModel';

export default class LoginService {
  public static async login(email: string, password: string)
    : Promise<string | { message: string }> {
    const userExist = await UserModel.findOne({ where: { email } });
    console.log(userExist?.password);
    if (!userExist) {
      return { message: 'Invalid email or password' };
    }
    const unlock = compareSync(password, userExist.password);
    if (!unlock) {
      return { message: 'Invalid email or password' };
    }
    return createTokenJWT({ email, password });
  }
}
