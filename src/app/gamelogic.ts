import {Status} from "./game-status";

export class Gamelogic {
  gameField : Array<number> =[];
  currentTurn! : number;
  gameStatus: Status;
  winSituationOne: Array<Array<number>> =[
    [1,1,1,0,0,0,0,0,0],
    [0,0,0,1,1,1,0,0,0],
    [0,0,0,0,0,0,1,1,1],
    [1,0,0,1,0,0,1,0,0],
    [0,1,0,0,1,0,0,1,0],
    [0,0,1,0,0,1,0,0,1],
    [0,0,1,0,1,0,1,0,0],
    [1,0,0,0,1,0,0,0,1],
  ];
  winSituationTwo: Array<Array<number>> =[
    [2,2,2,0,0,0,0,0,0],
    [0,0,0,2,2,2,0,0,0],
    [0,0,0,0,0,0,2,2,2],
    [2,0,0,2,0,0,2,0,0],
    [0,2,0,0,2,0,0,2,0],
    [0,0,2,0,0,2,0,0,2],
    [0,0,2,0,1,0,2,0,0],
    [2,0,0,0,2,0,0,0,2],
  ]

  public constructor() {
    this.gameStatus = Status.STOP;
    this.gameField = [0,0,0,0,0,0,0,0,0];
    // this.currentTurn = 0
  }

  gameStart(): void {
    this.gameField = [0,0,0,0,0,0,0,0,0];
    this.currentTurn = this.randomPlayerStart();
    console.log(this.currentTurn);
    this.gameStatus = Status.START;
  }

  randomPlayerStart(): number{
    const startPlayer = Math.floor((Math.random())*2) + 1;
    return startPlayer;
  }

  setField(postion: number, value: number):void{
    this.gameField[postion] = value;
  }

  getPlayerColorClass(): string{
    const colorClass = ( this.currentTurn === 2) ? 'player-two': 'player-one';
    return colorClass;
  }

  changePlayer(): void {
    this.currentTurn = (this.currentTurn === 2) ? 1: 2;
  }

  arrayEquals(a: Array<any>, b: Array<any> ): boolean{
    return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((value, index) => value === b[index]);
  }

  async checkGameEndFull(): Promise<boolean>{
    let isFull= true;

      if(this.gameField.includes(0)){
        isFull = false;
      }

      if( isFull){
        console.log("Game End");
        this.gameEnd();
        return true;
    } else {
        return false;
      }
  }
  async checkGameWinner(): Promise<boolean>{
    let isWinner = false;

    const checkarray = (this.currentTurn === 1 )? this.winSituationOne : this.winSituationTwo;

    const currentarray: any = [];

    this.gameField.forEach((subfield, index) => {
      if( subfield !== this.currentTurn){
          currentarray[index] = 0;
      }else{
        currentarray[index] = subfield;
      }
    });
    console.log(currentarray);
    checkarray.forEach((checkfield, checkindex) =>{
      if (this.arrayEquals(checkfield, currentarray)){
        isWinner = true;
      }
    })
    if(isWinner){
      console.log("game Win");
      this.gameEnd();
      return true;
    }else {
      return false;
    }
  }
  gameEnd():void{
    this.gameStatus = Status.STOP;
  }
}
