import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserGeoLocationService } from './user.geolocation.service';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;
  const mockedUser = {
    name: 'ussso',
    email: 'mohamed.yser@gmail.com',
    state: 'Alabama',
    city: 'Moundville',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserGeoLocationService,
        ConfigService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn((x) => mockedUser),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getUser', () => {
    it('should get user by id given', async () => {
      const result = await service.getUser(1);
      expect(result).toEqual(mockedUser);
    });
  });
  //   it('userRepository Should be defined', () => {
  //     expect(userRepository).toBeDefined;
  //   });
});
