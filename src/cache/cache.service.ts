import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor (
    @Inject(CACHE_MANAGER) private chaceManager: Cache
  ){}

  async getCache<T>(key: string, functionRequest: () => Promise<T>):Promise<T> {
    const allData: T = await this.chaceManager.get(key)

    if(allData) return allData;

    const cities: T = await functionRequest();

    await this.chaceManager.set(key, cities)

    return cities;
  }
}
