import { Component, OnInit } from '@angular/core';
import { NoteModel } from 'src/app/models/note';
import { CalculationService, Entity } from 'src/app/services/calculation.service';

@Component({
  selector: 'app-requests-view',
  templateUrl: './requests-view.component.html',
  styleUrls: ['./requests-view.component.scss']
})
export class RequestsViewComponent implements OnInit {

  constructor(
    private _calculationService: CalculationService
  ) {

    
  }
  ngOnInit(): void {
    this.requests =  this._calculationService.getAll(Entity.REQUEST) as NoteModel[]
  }


  changed($event: any) {
    this.requests = $event;
  }

  requests: NoteModel[];

}
