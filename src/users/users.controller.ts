import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { RefreshJwtGuard } from 'src/guard/refreshToken.guard';

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
  
  @UseGuards(RefreshJwtGuard)
  @Post('/refreshToken')
  async refreshToken(@Req() req) {
    const payload = {
      id: req.user.id,
      email: req.user.email,
    };
    return this.authService.refreshToken(payload);
  }
}
