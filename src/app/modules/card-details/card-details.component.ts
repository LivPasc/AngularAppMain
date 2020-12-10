import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from 'src/app/shared/get-data.service';
import { ValuesModel } from 'src/app/values-model';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit {
  public microcontrollerData: ValuesModel[];
  public displayedColumns: string[] = ['id', 'micId', 'date', 'temperature','humidity', 'dust', 'door','power'];
  public dataSource: ValuesModel[];

  constructor(
    private getDataService: GetDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    // let array = this.getDataService.getDataLast(id).subscribe((x) => {
    //   x.map((s) => {
    //     let value = {
    //       microcontrollerID: s.microcontrollerID,
    //       dateTime: s.dateTime,
    //       temperature: s.temperature,
    //       doorOpen: s.doorOpen,
    //       dust: s.dust,
    //       humidity: s.humidity,
    //       power: s.power,
    //     } as ValuesModel;
    //     return value;
    //   });
    // });

    this.getDataService.getDataLast(id).subscribe((e) => {
      this.microcontrollerData = e;
    });

    console.log(this.microcontrollerData);
  }
}
