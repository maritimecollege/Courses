import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, reduce, Subject } from 'rxjs';
import { NoteModel } from '../models/note';
import { UUID } from 'angular2-uuid';
import { NeedAmountModel } from '../models/need-amount';


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
    return new Set(this.getAll(Entity.REQUEST).map(en => en.groupCode!));
  }

  defineNeedAmount(groupCode: string) : NeedAmountModel {
    let tempReq = this.requests.getValue()?.filter(req => req.groupCode == groupCode);
    console.log(tempReq)

    let allGradesCount = tempReq?.map(req => (Number(req.fivesQuantity!) + Number(req.foursQuantity!) + Number(req.threesQuantity!) + Number(req.twosQuantity!)));
    let averageGrade = tempReq?.map(req => (Number(req.fivesQuantity!) * 5 + Number(req.foursQuantity!) * 4 + Number(req.threesQuantity!) * 3 + Number(req.twosQuantity!) * 2));
    let missedLectionsAndPractises = tempReq?.map(req => (Number(req.missedLectionsQuantity) + Number(req.missedPracticesQuantity))).reduce((acc, value) => acc + Number(value), 0);
    let missedLections = tempReq?.map(req => (req.missedLectionsQuantity)).reduce((acc, value) => acc! + Number(value), 0);
    let missedPractices = tempReq?.map(req => (req.missedPracticesQuantity)).reduce((acc, value) => acc! + Number(value), 0);
   let avMark = averageGrade?.reduce((acc, value) => acc + Number(value), 0);
   let avMarkCount = allGradesCount?.reduce((acc, value) => acc + Number(value), 0);
    console.log(avMark! / avMarkCount!)
    console.log(missedLectionsAndPractises)
    console.log(missedLections)
    console.log(missedPractices)
    let res: NeedAmountModel = {
      id: UUID.UUID(),
      groupCode: groupCode,
      averageGrade: avMark! / avMarkCount!,
      totalMissedLectionsAndPractices: missedLectionsAndPractises!,
      totalMissedLections: missedLections!,
      totalMissedPractices: missedPractices!,
    }

    return res;
  }


}


export enum Entity {
  REQUEST,
  LIMIT,
  NEED_AMOUNT,
}