import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/interfaces/answer';
import { Player } from 'src/app/interfaces/player';
import { Question } from 'src/app/interfaces/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{

  questions: Question[] = [
    {
      questionNumber: 1,
      questionString: 'What is your favorite answer?',
      answerChoices: [
        { answerString: 'answer1', color: 'primary', disabled: false },
        { answerString: 'answer2', color: 'primary', disabled: false },
        { answerString: 'answer3', color: 'primary', disabled: false },
        { answerString: 'answer4', color: 'primary', disabled: false },
      ],
      correctAnswer: { answerString:'answer1', color:'primary', disabled: false } ,
    },
    {
      questionNumber: 2,
      questionString: 'What is your second favorite answer?',
      answerChoices: [
        { answerString: 'answer1', color: 'primary', disabled: false },
        { answerString: 'answer2', color: 'primary', disabled: false },
        { answerString: 'answer3', color: 'primary', disabled: false },
        { answerString: 'answer4', color: 'primary', disabled: false },
      ],
      correctAnswer: { answerString:'answer2', color:'primary', disabled: false } ,
    },
    {
      questionNumber: 3,
      questionString: 'What is your third favorite answer?',
      answerChoices: [
        { answerString: 'answer1', color: 'primary', disabled: false },
        { answerString: 'answer2', color: 'primary', disabled: false },
        { answerString: 'answer3', color: 'primary', disabled: false },
        { answerString: 'answer4', color: 'primary', disabled: false },
      ],
      correctAnswer: { answerString:'answer3', color:'primary', disabled: false } ,
    },
    {
      questionNumber: 4,
      questionString: 'What is your fourth favorite answer?',
      answerChoices: [
        { answerString: 'answer1', color: 'primary', disabled: false },
        { answerString: 'answer2', color: 'primary', disabled: false },
        { answerString: 'answer3', color: 'primary', disabled: false },
        { answerString: 'answer4', color: 'primary', disabled: false },
      ],
      correctAnswer: { answerString:'answer4', color:'primary', disabled: false } ,
    }
  ];
  curQuestionIndex: number = 0;
  buttonColor: string = 'primary';
  selectedAnswer: Answer = {
    answerString: '',
    color: '',
    disabled: false
  };
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
  isCorrectAnswer: boolean | null = null;
  showAnswerResult: boolean = false;
  displayGameResults: boolean = false;

  ngOnInit(): void {
  }

  selectAnswer(answerSelected: Answer) : void {
    this.showAnswerResult = true;
    this.selectedAnswer = {
      answerString: answerSelected.answerString,
      color: 'primary',
      disabled: false
    }
    let currQuestionObj: Question = this.questions[this.curQuestionIndex];
    if (currQuestionObj.correctAnswer.answerString === answerSelected.answerString) {
      answerSelected.color = 'accent';

      currQuestionObj.answerChoices
      this.isCorrectAnswer = true;
      this.players[this.currPlayerIndex].score++;
      console.log("correct");
    }
    else {
      answerSelected.color = 'warn';
      this.isCorrectAnswer = false;
      console.log("incorrect");
    }
    this.disableAnswerChoices(currQuestionObj, answerSelected);
    setTimeout(() => {
      this.isCorrectAnswer = null;
      this.showAnswerResult= false;
      currQuestionObj.correctAnswer.color = 'primary';
      this.enableAnswerChoices(currQuestionObj);
      this.toggleNextQuestion();
      this.toggleNextPlayer();

    }, 2000);


  }
  toggleNextPlayer(): void {
    this.currPlayerIndex++;
    if (this.currPlayerIndex >= this.players.length) {
      this.currPlayerIndex = 0;
    }
  }

  toggleNextQuestion(): void {
    this.curQuestionIndex++;
    if (this.curQuestionIndex >= this.questions.length) {
      this.curQuestionIndex = 0;
    }
  }

  disableAnswerChoices(curQuestion: Question, answerSelected: Answer): void {
    curQuestion.answerChoices.forEach( a => {
      if (a.answerString !== answerSelected.answerString) {
        a.disabled = true;
      }
    })
  }
  enableAnswerChoices(curQuestion: Question): void {
    curQuestion.answerChoices.forEach( a => {
      a.disabled = false;
      a.color = 'primary';
    })
  }

  showGameResults(): void {
    this.displayGameResults = true;
  }

}
