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
    example: 'username@example.com',
  })
  email: string;

  @IsNotEmpty({ message: 'latitude is required' })
  @IsNumber()
  @ApiProperty({
    example: 39.57336,
    description: 'the latitude of the US resident user ',
  })
  latitude: number;

  @IsNotEmpty({ message: 'longitude is required' })
  @IsNumber()
  @ApiProperty({
    example: -116.017411,
    description: 'the longitude of the US resident user ',
  })
  longitude: number;
}
