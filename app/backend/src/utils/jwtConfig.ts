import * as jwt from 'jsonwebtoken';
import LoginInterface from '../interfaces/LoginInterface';
// import { User } from '../interfaces/user.interface';

function createTokenJWT(payload: LoginInterface) {
  const secret: string = process.env.JWT_SECRET || 'secret';
  const config: jwt.SignOptions = {
    expiresIn: '3d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, secret, config);
  return token;
}

export default createTokenJWT;
