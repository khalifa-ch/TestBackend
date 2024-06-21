import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { RefreshJwtGuard } from 'src/guard/refreshToken.guard';
import { SigninUserDto } from './dto/signin-user.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async createParent(@Body() body: UserDto) {
    return await this.authService.signup(body);
  }
  @Post('/signin')
  async signin(@Body() body: SigninUserDto) {
    return await this.authService.signin(body.email, body.password);
  }

  @UseGuards(RefreshJwtGuard)
  @ApiBody({
    description: 'Refresh token request body',
    schema: {
      type: 'object',
      properties: {
        refresh: { type: 'string', example: 'your-refresh-token' },
      },
    },
  })
  @Post('/refreshToken')
  async refreshToken(@Req() req) {
    const payload = {
      id: req.user.id,
      email: req.user.email,
    };
    return this.authService.refreshToken(payload);
  }
}
