import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { UserLocation } from './userlocation.interface';
import axios from 'axios';

@Injectable()
export class UserGeoLocationService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Retrieves the user's geolocation information(country, state, and city) based on latitude and longitude.
   *
   * @param {number} latitude - The latitude of the user's location.
   * @param {number} longitude - The longitude of the user's location.
   * @returns {UserLocation} The geolocation information including country, state, and city.
   */
  async getUserGeo(latitude: number, longitude: number) {
    const res = await axios.get(
      `${this.configService.get(
        'GOOGLE_API_API_ADDRESS',
      )}?latlng=${latitude},${longitude}&key=${this.configService.get(
        'GOOGLE_MAPS_API_KEY',
      )}`,
    );
    const components = res.data.results[0].address_components;
    const userLocation: UserLocation = {};

    for (const addressComponent of components) {
      if (addressComponent.types.includes('country')) {
        userLocation.country = addressComponent.long_name;
      }
      if (addressComponent.types.includes('administrative_area_level_1')) {
        userLocation.state = addressComponent.long_name;
      }
      if (addressComponent.types.includes('locality')) {
        userLocation.city = addressComponent.long_name;
      }
    }

    return userLocation;
  }
}
