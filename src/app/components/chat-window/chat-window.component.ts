import { Component, OnInit, NgZone } from '@angular/core';
import { ChatService } from 'src/app/chat.service';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  feedback?: 'like' | 'dislike';
}

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {
  messages: Message[] = [];
  loading: boolean = false;
  constructor(private chatService: ChatService, private ngZone: NgZone) {}
  
  ngOnInit(): void {
    this.ssendMessage()
    // this.messages.push({ text: 'Hii', sender: 'user' });
    // this.messages.push({ text: 'Hello! How can I assist you today? 😊', sender: 'bot' });
    // this.messages.push({ text: 'Hii', sender: 'user' });
    // this.messages.push({ text: 'Hello! How can I assist you today? 😊', sender: 'bot' });
    // this.messages.push({ text: 'Hii', sender: 'user' });
    // this.messages.push({ text: 'Hello! How can I assist you today? 😊', sender: 'bot' });
    // this.messages.push({ text: 'Hii', sender: 'user' });
    // this.messages.push({ text: 'Hello! How can I assist you today? 😊', sender: 'bot' });
    // this.messages.push({ text: 'Hii', sender: 'user' });
    // this.messages.push({ text: 'Hello! How can I assist you today? 😊', sender: 'bot' });
    // this.messages.push({ text: 'Hii', sender: 'user' });
    // this.messages.push({ text: 'Hello! How can I assist you today? 😊', sender: 'bot' });
    // this.messages.push({ text: 'Hii', sender: 'user' });
    // this.messages.push({ text: 'Hello! How can I assist you today? 😊', sender: 'bot' });
    // this.messages.push({ text: 'Hii', sender: 'user' });
    // this.messages.push({ text: 'Hello! How can I assist you today? 😊', sender: 'bot' });
    // this.messages.push({ text: 'Hii', sender: 'user' });
    // this.messages.push({ text: 'Hello! How can I assist you today? 😊', sender: 'bot' });
    
  }

  addMessage(text: string, sender: 'user' | 'bot') {
    this.messages.push({ text, sender });
  }
  handleMessage(message: string) {
    console.log('User Message:', message);
    this.messages.push({ text: message, sender: 'user' });
    this.messages.push({ text: 'Hello! How can I assist you today? 😊', sender: 'bot' });
  }

  rateResponse(message: Message, feedback: 'like' | 'dislike') {
    if (message.feedback === feedback) {
      message.feedback = undefined; // Toggle off if already selected
    } else {
      message.feedback = feedback;
    }
    console.log(`User ${feedback}d response: "${message.text}"`);
  }






  ssendMessage() {
    const data = {
      chat_session_id: "5bcade5a-fee0-473c-825c-d3de34b335de",
      parent_message_id: 2,
      prompt: "hi",
      ref_file_ids: [],
      thinking_enabled: false,
      search_enabled: false
    };

    this.chatService.streamMessages(data, (message1) => {
      console.log(message1)
      // this.messages.push(message);
      // this.messages.push({ text: message1, sender: 'bot' });  // ✅ Display in UI
      this.ngZone.run(() => {  // Ensure UI updates
        const lastMessage = this.messages[this.messages.length - 1];
  
        if (lastMessage && lastMessage.sender === 'bot') {
          lastMessage.text += " " + message1; // Append to existing message
        } else {
          this.messages.push({ text: message1, sender: 'bot' });
        }
      });
    });
  }













}
