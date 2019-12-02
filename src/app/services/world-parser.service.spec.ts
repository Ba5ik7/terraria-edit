import { TestBed } from '@angular/core/testing';

import { WorldParserService } from './world-parser.service';

describe('WorldParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorldParserService = TestBed.get(WorldParserService);
    expect(service).toBeTruthy();
  });
});
