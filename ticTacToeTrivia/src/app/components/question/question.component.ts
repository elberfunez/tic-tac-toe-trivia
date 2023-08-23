import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/interfaces/player';
import { Question } from 'src/app/interfaces/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{

  questions: Question[] = [{
    questionNumber: 1,
    questionString: 'What is your favorite answer?',
    answerChoices: ['answer1', 'answer2', 'answer3', 'answer4'],
    correctAnswer: 'answer3',
  }];
  curQuestionIndex: number = 0;
  selectedAnswer: string = '';
  players: Player[] = [
    {
      playerName: 'Elber',
      score: 0
    },
    {
      playerName: 'Eddy',
      score: 0
    }
  ];
  currPlayerIndex: number = 0;

  ngOnInit(): void {
  }

  selectAnswer(answerSelected: string) : void {
    let currQuestionObj: Question = this.questions[this.curQuestionIndex];
    if (currQuestionObj.correctAnswer === answerSelected) {
      this.players[this.currPlayerIndex].score++;
      console.log("correct");
      this.curQuestionIndex++;
      this.currPlayerIndex++;
    }
    else {
      console.log("incorrect");
      this.currPlayerIndex++;
    }



  }




}
