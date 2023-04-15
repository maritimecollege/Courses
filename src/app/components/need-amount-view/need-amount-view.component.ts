import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NeedAmountModel } from 'src/app/models/need-amount';
import { CalculationService, Entity } from 'src/app/services/calculation.service';

@Component({
  selector: 'app-need-amount-view',
  templateUrl: './need-amount-view.component.html',
  styleUrls: ['./need-amount-view.component.scss']
})
export class NeedAmountViewComponent implements OnInit {

  @Input()
  needAmount: NeedAmountModel;


  public needAmountForm = this._fb.group({
    id: [''],
    groupCode: ['', Validators.required],
    debugedProgramsPercent: [0, Validators.required],
  })

  constructor(
    private _fb: FormBuilder,
    private _calculationService: CalculationService
  ) { }

  ngOnInit(): void {
    this.needAmountForm.patchValue(this.needAmount);
  }



}
