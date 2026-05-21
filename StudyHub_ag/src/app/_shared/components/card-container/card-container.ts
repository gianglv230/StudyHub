import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-container',
  imports: [],
  templateUrl: './card-container.html',
  styleUrl: './card-container.css',
})
export class CardContainer {
  @Input()
  cardContainer!: CardContainerModel;

}
