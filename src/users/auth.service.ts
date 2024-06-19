import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UsersService } from './users.service';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(user: UserDto) {
    const userExist = await this.userService.findByEmail(user.email);
    if (userExist) {
      throw new BadRequestException('email is in use ');
    }

    if (user.password !== user.confirmPassword) {
      throw new BadRequestException('Please confirm your password');
    }
    //hashing the  user password
    //generate a salt
    const salt = randomBytes(8).toString('hex');
    // hash the salt and the password together
    const hash = (await scrypt(user.password, salt, 32)) as Buffer;
    //Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    user.password = result;
    //create a new user and save it
    return await this.userService.create(user);
  }

  async signin(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (hash.toString('hex') !== storedHash) {
      throw new BadRequestException('bad password');
    }
    const payload = { id: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '30d',
      }),
    };
  }
  async refreshToken(payload: any) {
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
