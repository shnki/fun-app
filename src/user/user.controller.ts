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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userservice: UserService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ description: 'User created' })
  @ApiBadRequestResponse({
    description: 'Error , Maybe user already signed up',
  })
  async signup(@Body() userData: SignupDto) {
    const response = await this.userservice.signUp(userData);
    return response;
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
