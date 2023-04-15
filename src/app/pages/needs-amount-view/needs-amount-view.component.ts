import { Component, OnInit } from '@angular/core';
import { ActorsAmountModel } from 'src/app/models/actors-amount';
import { NeedAmountModel } from 'src/app/models/need-amount';
import { TotalModel } from 'src/app/models/total';
import { CalculationService, Entity } from 'src/app/services/calculation.service';

@Component({
  selector: 'app-needs-amount-view',
  templateUrl: './needs-amount-view.component.html',
  styleUrls: ['./needs-amount-view.component.scss']
})
export class NeedsAmountViewComponent implements OnInit {


  data: any;

  options: any;
 
  circleData: any;

  circleOptions: any;

  total: TotalModel;

  actors: ActorsAmountModel[] = [];
  constructor(
    private _calculationService: CalculationService
  ) {

    
  }
  ngOnInit(): void {
    this.total = this._calculationService.defineTotalAmount()!;
    let numbers = this._calculationService.getAllNumbers();
    numbers.forEach(num => {
      this.needsAmount.push(this._calculationService.defineNeedAmount(num));
  })
    // let theaters = this._calculationService.getAllTheaters();
  //  theaters.forEach(num => {
      // this.actors.push(this._calculationService.defineActorsAmount(num));
  // })
    let textColor = "#000";
    let textColorSecondary = "#6C757D";
    let surfaceBorder = "#DFE7EF";
    this.data = {
      labels: this.needsAmount.map(need => need.groupCode),
      datasets: [
          {
              label: 'Процент отложенных программ',
              backgroundColor: 'green',
              borderColor: 'green',
              data: this.needsAmount.map(need => need.debugedProgramsPercent)
          },

      ]
  };

  this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: textColorSecondary,
                  font: {
                      weight: 500
                  }
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          }
        }
      }
      this.circleData = {
        labels: this.needsAmount.map(need => need.groupCode),
        datasets: [
            {
                data: this.needsAmount.map(need => need.debugedProgramsPercent),
                backgroundColor: this.needsAmount.map(need => this.getRandomColor()),
                hoverBackgroundColor: this.needsAmount.map(need => this.getRandomColor())
            }
        ]
    };

    this.circleOptions = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };
    }

    
  


  needsAmount: NeedAmountModel[] = [];

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  changed($event: any) {
    this.needsAmount = $event;
  }

  response() {

  }

  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
