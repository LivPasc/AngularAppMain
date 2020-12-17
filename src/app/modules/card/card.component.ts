import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GetDataService } from 'src/app/shared/get-data.service';
import { ValuesModel } from 'src/app/values-model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() blockCards: ValuesModel[];
  @Input('selectedValue') selectedValue: number;

  constructor(
    private _router: Router,
    private getDataService: GetDataService,
    private _snackBar: MatSnackBar
  ) {}

  public valuesModel: ValuesModel;
  public statusValue: string;
  public backgroundColor: string = 'green';

  ngOnInit(): void {
    this.createCards();
    if (this.blockCards?.length != 0)
      localStorage.setItem('session', JSON.stringify(this.blockCards));
  }

  private setStatus(valueModel: ValuesModel) {
    if (
      valueModel.temperature > 60 ||
      valueModel.humidity > 70 ||
      valueModel.dust > 15
    ) {
      this.statusValue = 'Critical';
      this.backgroundColor = 'red';
      this._snackBar.open(
        `Microcontroller ${valueModel.microcontrollerID} is in critical state`,
        'Dismiss',
        {
          duration: 60 * 1000,
        }
      );
    } else if (
      (valueModel.temperature < 60 && valueModel.temperature > 40) ||
      (valueModel.humidity <= 70 && valueModel.humidity > 50) ||
      valueModel.doorOpen != true ||
      valueModel.dust > 0
    ) {
      this.statusValue = 'Warning';
      this.backgroundColor = 'orange';
    } else {
      this.statusValue = 'Ok';
      this.backgroundColor = 'green';
    }
  }

  private async createCards(): Promise<void> {
    this.blockCards.forEach((x) => {
      // this.getDataService.getData(x.microcontrollerID).subscribe((c) => {
        this.valuesModel = x;
        this.setStatus(this.valuesModel);
      // });
    });
  }

  public openDetailedView(args: number): void {
    this._router.navigate(['/details', args]);
  }
}
