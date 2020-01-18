import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { GameButtonComponent } from './components/game/game-button/game-button.component';
import { GameStateService } from './service/game-state.service';


@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, GameComponent, GameButtonComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ GameStateService ],
})
export class AppModule { }
