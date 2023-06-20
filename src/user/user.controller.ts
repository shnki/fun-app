import {
  Controller,
  Get,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Param,
  ParseIntPipe,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto } from './dto/signup.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userservice: UserService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() userData: SignupDto) {
    try {
      const response = await this.userservice.signUp(userData);
      return { message: response };
    } catch (error) {
      Logger.error(error);
      throw new BadRequestException('invaild data');
    }
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) userId: number) {
    const user = await this.userservice.getUser(userId);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
