import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Chat1RoutingModule } from './chat1-routing.module';
import { Chat1Component } from './chat1.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ChatWindowComponent } from '../components/chat-window/chat-window.component';
import { ChatInputComponent } from '../components/chat-input/chat-input.component';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [
    SidebarComponent,
    ChatInputComponent,
    ChatWindowComponent,
    Chat1Component,

  ],
  imports: [
    FormsModule,
    
    CommonModule,
    Chat1RoutingModule,
    Chat1RoutingModule,
    
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatChipsModule,
    MatCardModule,
    MatSnackBarModule
  ],
  exports:[
    FormsModule,
    ChatInputComponent,
    CommonModule,
    Chat1RoutingModule,
    ChatWindowComponent,
    Chat1RoutingModule,
    SidebarComponent,
    Chat1Component,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatChipsModule,
    MatCardModule,
    MatSnackBarModule
  ]
})
export class Chat1Module { }
