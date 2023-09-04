import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './components/grid/grid.component';
import { QuestionComponent } from './components/question/question.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'gameboard', component: GridComponent },
  { path: 'question', component: QuestionComponent },
  { path: '', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
