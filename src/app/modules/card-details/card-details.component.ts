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
  public firstData: Charts[];

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
    });
  }
  mapValuesFirstData(e: ValuesModel[]) {
    this.firstData = []
    // e.map((x) => {
    //   let arr = new Array(2);
    //   arr = [new Date(x.dateTime), x.temperature]
    //   this.firstData.push(arr);
    // });
    e.forEach(m => this.firstData.push(new Charts(m.dateTime, m.temperature)))
  }
}
