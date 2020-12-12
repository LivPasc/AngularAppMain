import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from 'src/app/shared/get-data.service';
import { ValuesModel } from 'src/app/values-model';
import { Charts } from 'src/app/Charts';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit {
  public microcontrollerData: ValuesModel[];
  public firstData: any[];
  public humidityData: any[];
  public powerData: any[];
  public valuesModel: ValuesModel;

  constructor(
    private getDataService: GetDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getInitialData();
  }

  private async getInitialData() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getDataService.getDataLast(id).subscribe((e) => {
      this.microcontrollerData = e;
      this.mapValuesFirstData(e);
      this.mapValuesHumidity(e);
      this.mapValuesPower(e);
      this.valuesModel = e[e.length-1];
    });
  }

  mapValuesFirstData(e: ValuesModel[]) {
    this.firstData = [];
    e.map((x) => {
      let arr = new Array();
      arr = [new Date(x.dateTime).getTime() + 60 * 60 * 1000, x.temperature];
      this.firstData.push(arr);
    });
  }

  mapValuesHumidity(e: ValuesModel[]) {
    this.humidityData = [];
    e.map((x) => {
      let arr = new Array();
      arr = [new Date(x.dateTime).getTime() + 60 * 60 * 1000, x.humidity];
      this.humidityData.push(arr);
    });
  }

  mapValuesPower(e: ValuesModel[]) {
    this.powerData = [];
    e.map((x) => {
      let arr = new Array();
      arr = [new Date(x.dateTime).getTime() + 60 * 60 * 1000, x.power];
      this.powerData.push(arr);
    });
  }
}
