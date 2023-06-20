import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
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

  async signUp(userData: userdata) {
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

      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);
      return newUser;
    }
    return `Can't sign up, User's not a US resident`;
  }

  async getUser(userId: number): Promise<User> {
    return await this.userRepository.findOneBy({
      id: userId,
    });
  }
}
