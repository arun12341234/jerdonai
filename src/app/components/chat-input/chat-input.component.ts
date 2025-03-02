import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChatInputComponent {
  userInput: string = '';

  @Output() sendMessageEvent = new EventEmitter<string>();

  sendMessage() {
    if (this.userInput.trim()) {
      this.sendMessageEvent.emit(this.userInput);
      this.userInput = '';
    }
  }
}
