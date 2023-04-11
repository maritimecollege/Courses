import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, reduce, Subject } from 'rxjs';
import { NoteModel } from '../models/note';
import { UUID } from 'angular2-uuid';
import { NeedAmountModel } from '../models/need-amount';
import { TotalModel } from '../models/total';
import { ActorsAmountModel } from '../models/actors-amount';


@Injectable({
  providedIn: 'root'
})
export class CalculationService{

  constructor() {
      this.requests.next(this.getAll(Entity.REQUEST) as NoteModel[]);
   }


  private keyWordRequest = 'BVIrequest ';
  private keyWordLimit = 'BVIlimits ';
  private keyWordNeedAMount = 'BVINeedAmount ';

  private requests = new BehaviorSubject<NoteModel[] | null>(null);

  add(model: NoteModel | NeedAmountModel, entity: Entity): Observable<string> {
    let uuid = UUID.UUID();
    model.id = uuid;
    let keyWord = this.getKeyWord(entity);
    localStorage.setItem(keyWord + uuid, JSON.stringify(model));
    return of(uuid);
  }

  edit(model: NoteModel, entity: Entity): Observable<string> {
    let keyWord = this.getKeyWord(entity);
    localStorage.setItem(keyWord + model.id, JSON.stringify(model));
    return of(model.id!);
  }

  delete(id: string, entity: Entity): Observable<string> {
    let keyWord = this.getKeyWord(entity);
    localStorage.removeItem(keyWord + id)
    return of(id);
  }

  get(id: string, entity: Entity): Observable<NoteModel> {
    let keyWord = this.getKeyWord(entity);
    let req = localStorage.getItem(keyWord + id)
    return of(JSON.parse(req!));
  }

  getAll(entity: Entity): NoteModel[]  {
    let keyWord = this.getKeyWord(entity);
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;
    while (i--) {
      if (keys[i].includes(keyWord)) {
        values.push(JSON.parse(localStorage.getItem(keys[i])!));
      }
    }
    return values;
  }

  getKeyWord(entity: Entity) : string {
    if(entity === Entity.REQUEST) {
      return this.keyWordRequest;
    } else if (entity === Entity.LIMIT) {
      return this.keyWordLimit;
    }
    return this.keyWordNeedAMount;
  }

  getAllNumbers(): Set<string> {
    return new Set(this.getAll(Entity.REQUEST).map(en => en.producerFIO!));
  }

  getAllTheaters(): Set<string> {
    return new Set(this.getAll(Entity.REQUEST).map(en => en.theatreName!));
  }

  defineNeedAmount(flightNumber: string) : NeedAmountModel {
    let tempReq = this.requests.getValue()?.filter(req => req.producerFIO == flightNumber);
    console.log(tempReq)

    let oneProducerActorsCount = tempReq?.length;
    
    let res: NeedAmountModel = {
      id: UUID.UUID(),
      producerFio: flightNumber,
      actorsCountForOneProducer: oneProducerActorsCount!,
    }

    return res;
  }

  defineActorsAmount(flightNumber: string) : ActorsAmountModel {
    let tempReq = this.requests.getValue()?.filter(req => req.theatreName == flightNumber);
    console.log(tempReq)

    let oneProducerActorsCount = tempReq?.length;
    let groupAm = tempReq?.reduce((acc, val) => Number(acc) + Number(val.groupCount), 0)
    let res: ActorsAmountModel = {
      id: UUID.UUID(),
      theaterName: flightNumber,
      actorsCount: oneProducerActorsCount!,
      groupAmount: groupAm!
    }

    return res;
  }

  defineTotalAmount() : TotalModel | null {
    
    
    let tempReq = this.requests.getValue();
    let honoredActorsCount = tempReq?.filter(actor => actor.grade?.toLowerCase() == 'Заслуженный артист'.toLowerCase()).length;
    let smallSalaryActorsCount = tempReq?.filter(actor => Number(actor.salary)! <= 12000).length;
    console.log(tempReq)
    let res: TotalModel = {
      id: null,
      honoredActorsCount: honoredActorsCount!,
      smallSalaryActorsCount: smallSalaryActorsCount!,
    }

    return res;
  }


}


export enum Entity {
  REQUEST,
  LIMIT,
  NEED_AMOUNT,
}