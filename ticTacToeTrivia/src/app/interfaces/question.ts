import { Answer } from "./answer";

export interface Question {
  questionNumber: number;
  questionString: string;
  answerChoices: Answer[];
  correctAnswer: Answer;
}
