import { Player } from 'src/app/interfaces/player';
import { Component, OnInit } from '@angular/core';
import { Coordinate } from 'src/app/interfaces/coordinate';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit{

  constructor(private router: Router, private playerServ: PlayerService){

  }
  showSelectionAlert: boolean = false;
  cellClickable: boolean = true;
  gameBoard: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  colorMatrix: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  currentPlayer: Player = {} as Player;
  alertMsg: string = '';
  gameOver: boolean = false;
  winnerResult: string = ''

  markSelection(row: number, col: number): void {
    if (this.gameBoard[row][col] === '' && !this.gameOver) {
      this.gameBoard[row][col] = this.currentPlayer;

      if (this.currentPlayer === 'X') {
        this.colorMatrix[row][col] = 'red';
      } else {
        this.colorMatrix[row][col] = 'blue';
      }
      this.alertMsg =  this.currentPlayer + " made a move!"
      this.cellClickable = false;
      this.checkForWin();
      this.checkDraw();
      this.toggleNextPlayer();
      this.showSelectionAlert = true;

      setTimeout(() => {
        this.showSelectionAlert = false;
        this.alertMsg = '';
        this.cellClickable = true;
        this.navigateToQuestions();
       }, 2000); // 2000 milliseconds (2 seconds)
    }
  }

  toggleNextPlayer(): void {
    this.playerServ.updateCurrentPlayer()
    this.currentPlayer === 'X'
      ? (this.currentPlayer = 'O')
      : (this.currentPlayer = 'X');
  }

  navigateToQuestions(): void {
    this.router.navigate(['/question']); // navigate back home
  }

  checkForWin(): string | null {
    // Check rows
    for (let row = 0; row < 3; row++) {
      if (
        this.gameBoard[row][0] === this.currentPlayer &&
        this.gameBoard[row][1] === this.currentPlayer &&
        this.gameBoard[row][2] === this.currentPlayer
      ) {
        this.gameOver = true;
        this.winnerResult = this.currentPlayer;
        return this.currentPlayer; // Player wins
      }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
      if (
        this.gameBoard[0][col] === this.currentPlayer &&
        this.gameBoard[1][col] === this.currentPlayer &&
        this.gameBoard[2][col] === this.currentPlayer
      ) {
        this.gameOver = true;
        this.winnerResult = this.currentPlayer;
        return this.currentPlayer; // Player wins
      }
    }

    // Check diagonals
    if (
      this.gameBoard[0][0] === this.currentPlayer &&
      this.gameBoard[1][1] === this.currentPlayer &&
      this.gameBoard[2][2] === this.currentPlayer
    ) {
      this.gameOver = true;
      this.winnerResult = this.currentPlayer;
      return this.currentPlayer; // Player wins diagonally from top-left to bottom-right
    }

    if (
      this.gameBoard[0][2] === this.currentPlayer &&
      this.gameBoard[1][1] === this.currentPlayer &&
      this.gameBoard[2][0] === this.currentPlayer
    ) {
      this.gameOver = true;
      this.winnerResult = this.currentPlayer;
      return this.currentPlayer; // Player wins diagonally from top-right to bottom-left
    }

    // No winner yet
    return null;
  }


  checkDraw(): boolean {
    if (!this.checkForWin()) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.gameBoard[i][j] === '') {
            return false;
          }
        }
      }
      return true;
    }
    else {
      return false;
    }

  }

  disableGameBoard(): void {

  }

  clearGameBoard(): void {
    this.gameBoard = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.colorMatrix = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.gameOver = false;
    this.currentPlayer = 'X';
  }
}
