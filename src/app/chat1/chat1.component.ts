import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChatWindowComponent } from "../components/chat-window/chat-window.component";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
interface Message {
  text: any;
  sender: 'user' | 'bot';
  feedback?: 'like' | 'dislike';
}
@Component({
  selector: 'app-chat1',
  templateUrl: './chat1.component.html',
  styleUrls: ['./chat1.component.scss']
})
export class Chat1Component implements OnInit {
  chatTopics: string[] = ['General Chat', 'Tech Support', 'AI Chat', 'Customer Support'];
  messages: Message[] = [];
  loading: boolean = false;
  userInput: string = '';
  showChat = true;


   @Output() sendMessageEvent = new EventEmitter<string>();
  viewContainerRef: any;
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
