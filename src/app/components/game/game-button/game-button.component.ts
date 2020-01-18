import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-button',
  templateUrl: './game-button.component.html',
  styleUrls: ['./game-button.component.css']
})
export class GameButtonComponent implements OnInit {

  //adding color to button
  @Input() color: string;

  @Input() active: boolean = false;

  //adding guess EventEmitter - string - to button
  @Output() guess: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  //button onClick event
  onClick() { 
    this.guess.emit(this.color);
  }
}