import { Injectable } from '@angular/core';
import { Player } from '../interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  players: Player[] = [];
  currentPlayer: Player = this.players[0];

  constructor() { }

  updatePlayers( player1: Player, player2: Player): void {
    this.players.push(player1);
    this.players.push(player2);

  }

  getAllPlayers(): Player[] {
    return this.players;
  }

  resetPlayers(): void {
    this.players = [];
  }

  updateCurrentPlayer(newPlayer: Player): void {
    this.currentPlayer = newPlayer;
  }
}
