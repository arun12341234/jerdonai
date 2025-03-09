import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'chat', loadChildren: () => import('./chat1/chat1.module').then(m => m.Chat1Module) },
  // { path: 'chat', component: ChatComponent },
  // { path: 'upload', component: UploadComponent },
  { path: '**', redirectTo: '' } // Redirect unknown routes to Home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
