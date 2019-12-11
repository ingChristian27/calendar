import { TestBed } from '@angular/core/testing';

import { WeatherCitiesService } from './weather-cities.service';

describe('WeatherCitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherCitiesService = TestBed.get(WeatherCitiesService);
    expect(service).toBeTruthy();
  });
});
