import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GetDataService } from 'src/app/shared/get-data.service';
import { ValuesModel } from 'src/app/values-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  cards: ValuesModel[];
  controllers: number[] = [1, 2, 3, 4, 5, 6];
  controller = new FormControl();
  cardNumber: ValuesModel[];
  constructor(
    private getDataService: GetDataService,
    private _snackBar: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    this.cardNumber = localStorage.getItem('session')
      ? JSON.parse(localStorage.getItem('session'))
      : [];
    if (this.cardNumber?.length != 0) {
      await this.getLocalStoraged();
    }
  }

  private getLocalStoraged() {
    this.cardNumber.forEach((element) => {
      this.addCardAgain(element.microcontrollerID);
    });
  }

  async addCard(): Promise<void> {
    if(this.cards == undefined){
      this.cards = [];
    }
    if (
      !this.cards.some((c) => c.microcontrollerID === this.controller.value)
    ) {
      const valueModel = await this.getCardValues(this.controller.value).subscribe(x =>{
        let value = new ValuesModel()
       value.microcontrollerID = x.microcontrollerID;
       value.dateTime = x.dateTime;
       value.doorOpen = x.doorOpen;
       value.dust = x.dust;
       value.power = x.power;
       value.temperature = x.temperature;
       value.humidity = x.humidity;
       if (value != undefined && value != null) {
         this.cards.push(value);
       }
      });
    } else {
      this._snackBar.open('Card is already inserted', 'Dismiss', {
        duration: 2000,
      });
    }
  }

  async addCardAgain(id: number): Promise<void> {
    if (
      !this.cards?.some((c) => c.microcontrollerID === this.controller.value)
    ) {
      this.cards = new Array<ValuesModel>();
      const valueModel = await this.getCardValues(id).subscribe(x =>{
        let value = new ValuesModel()
       value.microcontrollerID = x.microcontrollerID;
       value.dateTime = x.dateTime;
       value.doorOpen = x.doorOpen;
       value.dust = x.dust;
       value.power = x.power;
       value.temperature = x.temperature;
       value.humidity = x.humidity;
       if (value != undefined && value != null) {
         this.cards.push(value);
       }
      });
    }
  }

  private getCardValues(id: number): Observable<ValuesModel> {
    let response = new ValuesModel();
    var subject = new Subject<ValuesModel>();
    this.getDataService.getData(id).subscribe((x) => {
      response.microcontrollerID = x?.microcontrollerID;
      response.dateTime = x?.dateTime;
      response.temperature = x?.temperature;
      response.humidity = x?.humidity;
      response.dust = x?.dust;
      response.doorOpen = x?.doorOpen;
      response.power = x?.power;
      subject.next(response);
    });
    return subject.asObservable();
  }

  public deleteCards(): void {
    localStorage.removeItem('session');
    if (this.cards != undefined && this.cards?.length != 0) {
      this.cards.length = 0;
    }
  }
}
