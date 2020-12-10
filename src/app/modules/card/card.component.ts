import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValuesModel } from 'src/app/values-model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() blockCards: ValuesModel[];
  @Input('selectedValue') selectedValue: number;
  changeLog: string[] = [];

  constructor(private _router: Router) {}

  public valuesModel: ValuesModel;

  ngOnInit(): void {
    this.createCards();
    if (this.blockCards.length != 0)
      localStorage.setItem('session', JSON.stringify(this.blockCards));
  }

  private createCards(): void {
    this.blockCards.forEach((x) => {
      this.valuesModel = x;
    });
  }

  public openDetailedView(args: number): void {
    this._router.navigate(['/details', args]);
  }
}
