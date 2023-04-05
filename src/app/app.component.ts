import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { NoteModel } from './models/note';
import { CalculationService, Entity } from './services/calculation.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Склад';


    constructor(
      private _calculationService: CalculationService
    ) {
      this.requests =  this._calculationService.getAll(Entity.REQUEST) as NoteModel[]
      
    }


    requests: NoteModel[];
}
