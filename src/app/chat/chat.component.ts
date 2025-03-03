import { Component, EventEmitter, OnInit, Output } from '@angular/core';
interface Message {
  text: any;
  sender: 'user' | 'bot';
  feedback?: 'like' | 'dislike';
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chatTopics: string[] = ['General Chat', 'Tech Support', 'AI Chat', 'Customer Support'];
  messages: Message[] = [];
  loading: boolean = false;
  userInput: string = '';
   @Output() sendMessageEvent = new EventEmitter<string>();
   
  ngOnInit(): void {
  }
  selectTopic(topic: string) {
    console.log(`Selected Topic: ${topic}`);
  }

  rateResponse(message: Message, feedback: 'like' | 'dislike') {
    if (message.feedback === feedback) {
      message.feedback = undefined; // Toggle off if already selected
    } else {
      message.feedback = feedback;
    }
    console.log(`User ${feedback}d response: "${message.text}"`);
  }
  sendMessage() {
    if (this.userInput.trim()) {
      this.sendMessageEvent.emit(this.userInput);
      this.userInput = '';
    }
  }
}
