import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DosComponent } from './components/dos/dos.component';
import { UnoComponent } from './components/uno/uno.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
    
  },
  {
    path: 'login',
    component: UnoComponent
  },
  {
  path: 'search',
  component: DosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
