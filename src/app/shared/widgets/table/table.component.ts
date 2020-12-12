import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ValuesModel } from 'src/app/values-model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
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

  @Input() microcontrollerData: ValuesModel[];

  dataSource : MatTableDataSource<ValuesModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {}
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<ValuesModel>(this.microcontrollerData);
  }

  ngAfterViewInit(): void {
    if(this.microcontrollerData != undefined){
    this.dataSource.data = this.microcontrollerData;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    }
  }
}
