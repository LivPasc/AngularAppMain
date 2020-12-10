import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GetDataService } from 'src/app/shared/get-data.service';
import { ValuesModel } from 'src/app/values-model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  cards: ValuesModel[];
  controllers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  controller = new FormControl();
  constructor(
    private getDataService: GetDataService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cards = localStorage.getItem('session')
      ? JSON.parse(localStorage.getItem('session'))
      : [];
  }

  addCard(): void {
    if (
      !this.cards.some((c) => c.microcontrollerID === this.controller.value)
    ) {
      this.getDataService.getData(this.controller.value).subscribe((x) =>
        this.cards.push({
          id: x.id,
          dateTime: x.dateTime,
          microcontrollerID: x.microcontrollerID,
          temperature: x.temperature,
          humidity: x.humidity,
          dust: x.dust,
          doorOpen: x.doorOpen,
          power: x.power,
        })
      );
    } else {
      this._snackBar.open('Card is already inserted', 'Dismiss', {
        duration: 2000,
      });
    }
  }

  public deleteCards(): void {
    localStorage.removeItem('session');
    this.cards.length = 0;
  }
}
