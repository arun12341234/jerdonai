import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as marked from 'marked';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChatInputComponent {
  userInput: string = '';

  @Output() sendMessageEvent = new EventEmitter<string>();

  // Method to emit the message and reset the input
  sendMessage(): void {
    if (this.userInput.trim()) {
      this.sendMessageEvent.emit(this.userInput);
      this.userInput = ''; // Clear the input
      this.resetTextareaHeight(); // Reset the textarea height
    }
  }

  // Method to auto-resize the textarea
  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Reset height to auto to calculate new height
    textarea.style.height = `${Math.min(textarea.scrollHeight, 500)}px`; // Set new height, max 500px
  }

  // Method to handle Enter key press
  onEnterKey(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent default behavior (e.g., new line)
      this.sendMessage(); // Send the message
    }
  }

  // Method to reset the textarea height
  private resetTextareaHeight(): void {
    const textarea = document.querySelector('.custom-textarea') as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height to default
    }
  }
}