import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { START_COUNT } from '../models/constants';
import { COLORS } from '../models/constants';

@Injectable()
export class GameStateService {

  //game AI - string array
  gameAI: string[] = [];

  //player - string array
  player: string[] = [];

  //counting the level of progres
  count: number;

  //observables
  state = new Subject<any>();

  constructor() { 
    this.count = START_COUNT;
  }

  /* 
  * random color generator method 
  * @return: string of random colors
  */
  private get randomColor(): string {
    return COLORS[Math.floor (Math.random() * 4)];
  }

  /* 
  * adding random color to gameAI
  * @return: void
  */
  appendGameAI(increment : boolean = false): void {
    if(increment) {
      this.count++;
    }
    this.gameAI.push(this.randomColor);
  }

  /*
  * generate gameAI
  * @return: array of strings
  */
  generateGameAI(): string[] {
    //emptying GameAI array for every new set of colors
    this.gameAI = [];
    
    for (let i = 0; i < this.count; i++) {
      this.appendGameAI();
    }
    
    //updateing state
    this.setState();

    return this.gameAI;
  }

  /*
  * restarting gameAI 
  * @return: array of strings
  */
  restartGameAI(): string[] {
    this.count = START_COUNT;
    return this.generateGameAI();
  }

  /*
  * player guess
  */
  playerGuess(val: string) {
    this.player.push(val);
    
    //if compareGuess is false
    if (!this.compareGuess()) {
      this.player = []; //reseting player array to null
    }
    //console.log(this.compareGuess()); //debug
    
    //updateing state
    this.setState();
  }

  /*
   * comparing player guess to gameAI
   * @return: boolean
   */
  compareGuess(): boolean {
    for (let i = 0; i < this.player.length; i++) {
      if(this.player[i] !== this.gameAI[i]) {
        return false;
      }
    }
    if (this.player.length === this.gameAI.length) {
      this.updateGame();
    }

    //if the guess matches with GameAI, then return true
    return true;
  }

  /*
  * updateing game is palyer guess match GameAI coloring
  */
  updateGame() {
    this.appendGameAI(true);
    this.player = [];
  }

  /*
  * auto-updateing game-state-setvice / state
  */
  setState() {
    this.state.next({
      player: this.player,
      gameAI: this.gameAI,
      count:  this.count
    });
  }
}