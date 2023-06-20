import { IsNotEmpty, IsNumber, IsEmail } from 'class-validator';

export class SignupDto {
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'latitude is required' })
  @IsNumber()
  latitude: number;

  @IsNotEmpty({ message: 'longitude is required' })
  @IsNumber()
  longitude: number;
}
