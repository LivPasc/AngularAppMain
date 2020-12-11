import { Component, Input, OnInit } from '@angular/core';
import { ValuesModel } from 'src/app/values-model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public displayedColumns: string[] = [
    'id',
    'micId',
    'date',
    'temperature',
    'humidity',
    'dust',
    'door',
    'power',
  ];

@Input() microcontrollerData: ValuesModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
