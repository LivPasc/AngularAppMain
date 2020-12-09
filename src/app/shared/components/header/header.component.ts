import { Component, OnInit } from '@angular/core';
interface RefreshValues {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public selectedValue: number = 0;
  isNavbarCollapsed=true;
  public dropdownItem: string = `Auto-refresh: ${this.selectedValue}`;
  public timer: RefreshValues[] = [
    {value: 15*1000, viewValue: '15s'},
    {value: 60*1000, viewValue: '1m'},
    {value: 5*60*1000, viewValue: '5m'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

  public refreshComponents() {
    // this.valuesComponent.setTimer
  }
}
