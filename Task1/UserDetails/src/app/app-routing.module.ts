import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserComponent } from './Users/user/user.component';

const routes: Routes = [
  { path: 'add', component: AddUserComponent },
  { path: 'home', component: UserComponent },
  { path: 'update/:id', component: EditUserComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
