import { Component, Input, OnInit } from '@angular/core';
import { ValuesModel } from 'src/app/values-model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() blockCards: ValuesModel[];

  constructor() { 
  }
    public valuesModel: ValuesModel;

  ngOnInit(): void {
    this.blockCards.forEach(x => {
      
      this.valuesModel = x;
    });
  }

}
