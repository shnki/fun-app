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
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { SignupDto } from './dto/signup.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userservice: UserService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({
    description: 'User created',
    schema: {
      example: {
        name: 'matt murdock',
        email: 'username@example.com',
        state: 'Nevada',
        city: 'Eureka',
        id: '31',
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      'Error , Maybe user already signed up or body is missing a field',
    schema: {
      example: {
        message: 'invalid data',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiOperation({ summary: 'signs up a user ' })
  async signup(@Body() userData: SignupDto) {
    const response = await this.userservice.signUp(userData);
    return response;
  }

  @Get(':id')
  @ApiOperation({ summary: 'get user by id' })
  @ApiResponse({
    status: 200,
    description: 'User returned',
    schema: {
      example: {
        name: 'matt murdock',
        email: 'daredevil@hotmail.com',
        state: 'Nevada',
        city: 'Eureka',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: {
      example: {
        message: 'Cannot GET /user/',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'invalid id',
    schema: {
      example: {
        message: 'Validation failed (numeric string is expected)',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  async getUser(@Param('id', ParseIntPipe) userId: number) {
    const user = await this.userservice.getUser(userId);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
