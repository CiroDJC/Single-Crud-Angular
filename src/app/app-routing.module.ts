import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePersonsComponent } from './components/create-persons/create-persons.component';
import { ListPersonsComponent } from './components/list-persons/list-persons.component';

const routes: Routes = [
  {path:'',redirectTo:'list-persons',pathMatch:'full'},
  {path:'list-persons',component:ListPersonsComponent},
  {path:'create-persons',component:CreatePersonsComponent},
  {path:'update-persons/:id',component:CreatePersonsComponent},
  {path:'**',redirectTo:'list-persons',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
