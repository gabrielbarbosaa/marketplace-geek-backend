import { Inject, Injectable } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class CityService {
  constructor (
    @InjectRepository(CityEntity) private readonly cityRepository:Repository<CityEntity>,
    @Inject(CACHE_MANAGER) private chaceManager: Cache
  ){}

  async getAllCitiesByStateId(stateId: number):Promise<CityEntity []> {
    const citiesCache: CityEntity[] = await this.chaceManager.get(`state_${stateId}`)

    if(citiesCache) return citiesCache;

    const cities = await this.cityRepository.find({where: {stateId}});

    await this.chaceManager.set(`state_${stateId}`, cities)

    return cities;
  }
}
