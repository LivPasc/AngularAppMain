import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValuesModel } from 'src/app/values-model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() blockCards: ValuesModel[];
  @Input('selectedValue') selectedValue: number;

  constructor(private _router: Router) {}

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
      valueModel.humidity > 60 ||
      valueModel.dust > 15
    ) {
      this.statusValue = 'Critical';
      this.backgroundColor = 'red';
    } else if (
      (valueModel.temperature < 60 &&
      valueModel.temperature > 40) ||
      (valueModel.humidity < 60 &&
      valueModel.humidity > 30) ||
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

  private createCards(): void {
    this.blockCards.forEach((x) => {
      this.valuesModel = x;
      this.setStatus(x);
    });
  }

  public openDetailedView(args: number): void {
    this._router.navigate(['/details', args]);
  }
}
