import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Logger } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  const mockedid = 1;
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getUser: jest.fn((id) => mockedUser),
            signUp: jest.fn((id) => mockedUser),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getUser', () => {
    it('should get a user by id ', async () => {
      //  jest.spyOn(service, 'getUser').mockResolvedValue(mockedUser);

      const result = await controller.getUser(mockedid);
      expect(result).toBe(mockedUser);
    });
  });
  describe('signUp', () => {
    it('should signUp a user', async () => {
      const result = await controller.signup(mockedDto);
      expect(result).toEqual(mockedUser);
    });
  });
});
