import { Component, OnInit } from '@angular/core';
import {Gamelogic} from "../../gamelogic";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [Gamelogic]
})
export class GameComponent implements OnInit {

  constructor( public game: Gamelogic) { }

  ngOnInit(): void {
  }

  startGame(): void{
    this.game.gameStart();
    const currentPlayer = 'Current turn: Player: ' + this.game.currentTurn;
    const infomation =<HTMLElement> document.querySelector(".current-status");
    infomation.innerHTML = currentPlayer;
  }

 async clickSubfield( subfield: any): Promise<any>{
    if(this.game.gameStatus === 1){
      const position = subfield.currentTarget.getAttribute('position');
      console.log(position);
      const information =<HTMLElement> document.querySelector('.current-status');

      this.game.setField(position, this.game.currentTurn);

      const color = this.game.getPlayerColorClass();
      subfield.currentTarget.classList.add(color);

     await this.game.checkGameWinner().then((end: boolean) => {
       if( this.game.gameStatus === 0 && end  ){
         information.innerHTML = 'The winner is player: ' + this.game.currentTurn;
       }
     })

     await this.game.checkGameEndFull().then((end:boolean) => {
       if(this.game.gameStatus === 0 && end) {
         information.innerHTML = 'No winner, draw';
       }
     });


      this.game.changePlayer();

      if(this.game.gameStatus === 1){
        const currentPlayer = 'Current turn: Player: ' + this.game.currentTurn;
        information.innerHTML = currentPlayer;
      }
    }
  }

}
