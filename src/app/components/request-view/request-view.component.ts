import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NoteModel } from 'src/app/models/note';
import { CalculationService, Entity } from 'src/app/services/calculation.service';


@Component({
  selector: 'app-request-view',
  templateUrl: './request-view.component.html',
  styleUrls: ['./request-view.component.scss'],
})
export class RequestViewComponent{

  @Input()
  request: NoteModel;

  public noteForm = this._fb.group({
    id: [''],
    flightNumber: ['', Validators.required],
    course: ['', Validators.required],
    planeBrand: ['', Validators.required],
    expenses: [0, Validators.required],
    passengersCount: [0, Validators.required],
  })


  constructor(
    private _fb: FormBuilder,
    private _calculationService: CalculationService,
    private modal: NzModalService
    ) { }

    ngOnInit() {
      this.noteForm.patchValue(this.request);
    }

    edit() {
      this._calculationService.edit(this.noteForm.value! as NoteModel, Entity.REQUEST);
      location.reload();
    }

    delete() {
      this._calculationService.delete(this.noteForm.controls.id.value!, Entity.REQUEST);
      location.reload();

    }

    confirmEdit() {
      this.modal.confirm({
        nzTitle: '<i>Вы уверены, что хотите отредактировать данную запись?</i>',
        nzOnOk: () => this.edit()
      });
  }

    confirmDelete() {
      this.modal.confirm({
        nzTitle: '<i>Вы уверены, что хотите удалить данную запись?</i>',
        nzContent: '<b>Отменить данное действие будет невозможно</b>',
        nzOnOk: () => this.delete()
      });
  }


}
