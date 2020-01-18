import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../../service/game-state.service';
import { sleep } from '../../models/constants.ts';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  //count to display state.count
  count: number;
  
  //color object
  colors: any = {
    red   : false,
    green : false,
    blue  : false,
    yellow: false,
    gold  : false
  };

  //adding GameStateService to game
  constructor(private game: GameStateService) { }

  //initialazing GameAI
  ngOnInit() { 
    //subscribeing to the state
    this.game.state.subscribe(state => {
      //console.log(state); //test-debug
      
      //only set new colors to array if count changes
      if (this.count != state.count) {
        this.count = state.count;
        this.gameAISteps(state.gameAI);
      }
    });
    
    //generate GameAI
    this.game.generateGameAI();
  }

  //player guess for color of GameAI
  playerGuess(event: string) {
    this.game.playerGuess(event);
  }

  /*
   * GameAI sets colors to guess 
   * (async function, see also: models/constats.ts)
   */
  async gameAISteps(gameAI: string[]) {
    for (let i = 0; i < gameAI.length; i++) {
      this.colors[gameAI[i]] = true;

      /*
      * change sleep(xxx) time for faster or slower game-play
      */
      await sleep(500);

      this.colors[gameAI[i]] = false;
      
      await sleep(500); 
    }
  }

  //restarting the game - by: reloading page
  restart(): void {
    window.location.reload();
  }
}