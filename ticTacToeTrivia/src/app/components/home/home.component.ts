import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/interfaces/player';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showErrorAlert: boolean = false;

  playerOne: Player = {
    playerName: '' ,
    score: 0,
    shortName: 'X'
  };

  playerTwo: Player = {
    playerName: '' ,
    score: 0,
    shortName: 'O'
  };

  constructor(private router: Router, private playerServ: PlayerService) {
 }

  ngOnInit(): void {
    this.playerServ.resetPlayers();
  }

  setPlayers(): void {
    this.playerServ.updatePlayers(this.playerOne, this.playerTwo);
  }

  navigateToQuestion(): void {
    if (this.playerOne.playerName === '' || this.playerTwo.playerName === '') {
      this.setErrorMsg();
    }
    else {
      this.setPlayers();
      this.router.navigate(['/question']); // navigate back home
    }

  }

  setErrorMsg(): void {
    // Inside your component methods or logic
    this.showErrorAlert = true;

    setTimeout(() => {
      this.showErrorAlert = false;
    }, 2000); // 2000 milliseconds (2 seconds)

  }
}
