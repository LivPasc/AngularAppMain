import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GetDataService } from 'src/app/shared/get-data.service';
import { ValuesModel } from 'src/app/values-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  cards: ValuesModel[];
  controllers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  controller = new FormControl();
  constructor(private getDataService: GetDataService) {}

  ngOnInit(): void {
    this.cards = [];
  }

  addCard() {
    if (
      !this.cards.some((c) => c.microcontrollerID === this.controller.value)
    ) {
      this.getDataService.getData(this.controller.value).subscribe((x) =>
        this.cards.push({
          dateTime: x.dateTime,
          microcontrollerID: x.microcontrollerID,
          temperature: x.temperature,
          humidity: x.humidity,
          dust: x.dust,
          doorOpen: x.doorOpen,
          power: x.power,
        })
      );
    }
  }
  deleteCards() {
    this.cards.length = 0;
  }
}
