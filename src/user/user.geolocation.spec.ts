import { Test, TestingModule } from '@nestjs/testing';
import { UserGeoLocationService } from './user.geolocation.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

describe('UserGeoLocationService', () => {
  const mockedlatitude = 37.7749;
  const mockedlongitude = -122.4194;
  let service: UserGeoLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGeoLocationService, ConfigService],
    }).compile();

    service = module.get<UserGeoLocationService>(UserGeoLocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserGeo', () => {
    it('should retrieve user geolocation information', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue({
        data: {
          results: [
            {
              address_components: [
                { types: ['country'], long_name: 'United States' },
                {
                  types: ['administrative_area_level_1'],
                  long_name: 'California',
                },
                { types: ['locality'], long_name: 'San Francisco' },
              ],
            },
          ],
        },
      });

      const result = await service.getUserGeo(mockedlatitude, mockedlongitude);

      expect(result).toEqual({
        country: 'United States',
        state: 'California',
        city: 'San Francisco',
      });
    });
  });
});
