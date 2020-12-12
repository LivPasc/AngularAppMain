import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { GetDataService } from '../../get-data.service';

interface RefreshValues {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public selectedValue: number = 0;
  public dropdownItem: string = `Auto-refresh: ${this.selectedValue}`;
  public subscribed: boolean = false;

  private updateSubscription: Subscription;

  public timer: RefreshValues[] = [
    { value: 0, viewValue: 'None' },
    { value: 15 * 1000, viewValue: '15s' },
    { value: 60 * 1000, viewValue: '1m' },
    { value: 5 * 60 * 1000, viewValue: '5m' },
  ];

  constructor(private _router: Router) {
    this.selectedValue = JSON.parse(localStorage.getItem('autorefresh'));
  }

  ngOnInit(): void {
    this.refreshComponents();
  }

  public goToHomePage(): void {
    this._router.navigateByUrl('/');
  }

  public goToNotification(): void {
    localStorage.removeItem('autorefresh');
    this.selectedValue = 0;
    this._router.navigateByUrl('/notification');
  }

  public refreshComponents(): void {
    localStorage.setItem('autorefresh', JSON.stringify(this.selectedValue));
    if (this.subscribed) this.updateSubscription.unsubscribe();
    this.subscribed = true;
    this.updateSubscription = interval(
      this.selectedValue != 0 && this.selectedValue != undefined
        ? this.selectedValue
        : 10000000
    ).subscribe((val) => {
      this.hitRefresh();
    });
  }

  public hitRefresh(): void {
    window.location.reload();
  }
}
