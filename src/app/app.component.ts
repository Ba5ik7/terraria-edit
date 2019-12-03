import { Component } from '@angular/core';
import { WorldParserService } from './services/world-parser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Terraria Edit';
  worldParser: WorldParserService;
  file: Blob;

  constructor() {
    this.worldParser = new WorldParserService;
  }

  renderMap() {
    this.worldParser.loadFile(this.file);
  }

  inputFileChange(event) {
    this.file = event.target.files[0];
  }
}
