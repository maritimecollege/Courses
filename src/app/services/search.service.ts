import { Injectable } from '@angular/core';
import { NeedAmountModel } from '../models/need-amount';
import { NoteModel } from '../models/note';
import { Entity } from './calculation.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  private keyWordRequest = 'BVIrequest ';
  private keyWordLimit = 'BVIlimits ';

  search(searchQuery: string, entities: NoteModel[] | NeedAmountModel[]): NoteModel[] | NeedAmountModel[] {
    let values: any = [];
    let withoutId = entities.map(({id, ...keepAttrs}) => keepAttrs);
    for(let i = 0; i < withoutId.length; i++){
      if(JSON.stringify(withoutId[i]).toString().toLowerCase().includes(searchQuery.toLowerCase())) {
        values.push(entities[i]);
      }
    }
    return values;
  }
}
