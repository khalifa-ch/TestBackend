import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UserDto } from './user.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('/signup')
  async createParent(@Body() body: UserDto) {
    return await this.authService.signup(body);
  }
  @Post('/signin')
  async signin(@Body() body: User) {
    return await this.authService.signin(body.email, body.password);
  }
}
