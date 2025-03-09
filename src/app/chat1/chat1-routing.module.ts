import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Chat1Component } from './chat1.component';

const routes: Routes = [{ path: '', component: Chat1Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Chat1RoutingModule { }
