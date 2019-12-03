import { Injectable } from '@angular/core';

import { FileParserService } from './file-parser.service';

@Injectable({
  providedIn: 'root'
})
export class WorldParserService extends FileParserService {

  constructor() {
    super();
  }
}