import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserGeoLocationService } from './user.geolocation.service';

type userdata = {
  name: string;
  email: string;
  latitude: number;
  longitude: number;
};

@Injectable()
export class UserService {
  constructor(
    private readonly userGeoloactionService: UserGeoLocationService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  /**
   * Signs up a user.
   *
   * @param {userdata} userData - The user data including name, email, latitude, and longitude.
   * @returns {User|string} returns the user if the user is a US resident or a message as a string to inform the user is not US resident.
   */
  async signUp(userData: userdata): Promise<User> {
    const geo = await this.userGeoloactionService.getUserGeo(
      userData.latitude,
      userData.longitude,
    );
    if (geo.country == 'United States') {
      const user = {
        name: userData.name,
        email: userData.email,
        state: geo.state,
        city: geo.city,
      };
      try {
        const newUser = this.userRepository.create(user);
        await this.userRepository.save(newUser);
        return newUser;
      } catch (error) {
        throw new BadRequestException('invalid data');
      }
    }
    throw new BadRequestException(`Can't sign up, User is not a US resident`);
  }

  /**
   * Retrieves a user by their ID.
   *
   * @param {number} userId - The ID of the user to retrieve.
   * @returns {User} The user with the specified ID.
   */
  async getUser(userId: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (user) {
      delete user.id;
    }
    return user;
  }
}
