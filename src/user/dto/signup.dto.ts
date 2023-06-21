import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsEmail } from 'class-validator';

export class SignupDto {
  @IsNotEmpty({ message: 'name is required' })
  @ApiProperty({
    example: 'matt murdock',
  })
  name: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail()
  @ApiProperty({
    example: 'daredevil@hotmail.com',
  })
  email: string;

  @IsNotEmpty({ message: 'latitude is required' })
  @IsNumber()
  @ApiProperty({
    example: 39.57336,
  })
  latitude: number;

  @IsNotEmpty({ message: 'longitude is required' })
  @IsNumber()
  @ApiProperty({
    example: -116.017411,
  })
  longitude: number;
}
