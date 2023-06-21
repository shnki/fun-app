import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { BadRequestException } from '@nestjs/common';
import { UserGeoLocationService } from './user.geolocation.service';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;
  let userGeoloactionService: UserGeoLocationService;
  const mockedUser = {
    name: 'sam',
    email: 'sam.alan@gmail.com',
    state: 'Alabama',
    city: 'Moundville',
  };
  const mockedDto = {
    name: 'ussso',
    email: 'yas.ora@gmail.com',
    latitude: 32.98521,
    longitude: -87.527722,
  };

  const mockedId = 123;
  const mockedNotFoundId = 321;
  const mockedGeo = {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,

        ConfigService,
        {
          provide: UserGeoLocationService,
          useValue: {
            getUserGeo: jest.fn((x) => mockedGeo),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn((x) => mockedUser),
            create: jest.fn((x) => mockedUser),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    userGeoloactionService = module.get<UserGeoLocationService>(
      UserGeoLocationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getUser', () => {
    it('should get user by id given', async () => {
      const result = await service.getUser(mockedId);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: mockedId });
      expect(result).toBe(mockedUser);
    });

    it('should return undfined or null when user does not exist', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(null);

      const result = await service.getUser(mockedNotFoundId);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({
        id: mockedNotFoundId,
      });
      expect(result).toBe(null);
    });
  });

  describe('signUp', () => {
    it('should sign up the user', async () => {
      const result = await service.signUp(mockedDto);
      expect(result).toBe(mockedUser);
    });

    it('shoud return error message when the user is not a US resident', async () => {
      jest.spyOn(userGeoloactionService, 'getUserGeo').mockResolvedValueOnce({
        country: 'Canada',
        state: 'Ontario',
        city: 'Toronto',
      });

      await expect(service.signUp(mockedDto)).rejects.toThrow(
        BadRequestException,
      );

      expect(userRepository.save).not.toHaveBeenCalled();
      expect(userRepository.create).not.toHaveBeenCalled();
    });
  });
});
