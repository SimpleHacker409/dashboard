import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-cards',
  templateUrl: './dash-cards.component.html',
  styleUrls: ['./dash-cards.component.scss']
})
export class DashCardsComponent implements OnInit {

  @Input() dashCardData: any;

  constructor() { }

  ngOnInit(): void {
    console.log("Her");

    console.log(this.dashCardData);

  }

}
