import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ChatService } from 'src/app/chat.service';
import { MarkdownService } from 'src/app/markdown.service';
import { marked } from 'marked';
interface Message {
  text: any;
  sender: 'user' | 'bot';
  feedback?: 'like' | 'dislike';
}

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  messages: Message[] = [];
  loading: boolean = false;
  constructor(private chatService: ChatService, private ngZone: NgZone,private markdownService: MarkdownService,
    private sanitizer: DomSanitizer) {}
  
  ngOnInit(): void {
    // this.ssendMessage()
    this.messages.push({ text: 'Hii', sender: 'user' });
    this.messages.push({ text: 'Hello! How can I assist you today? 😊', sender: 'bot' });
    this.messages.push({ text: 'how are you?', sender: 'user' });
    this.messages.push({ text: "I'm just a virtual assistant, so I don't have feelings, but I'm here and ready to help you with whatever you need! How are you doing? 😊", sender: 'bot' });
    this.messages.push({ text: 'How is weather today', sender: 'user' });
    this.messages.push({ text: "I don't have real-time data access, so I can't check the current weather for you. However, you can easily check the weather using a weather app, website, or by searching for your location on a platform like Google. Let me know if you need help with anything else! 😊", sender: 'bot' });
    this.messages.push({ text: 'Hii', sender: 'user' });
    this.messages.push({ text: 'Hello! How can I assist you today? 😊', sender: 'bot' });
    this.messages.push({ text: 'how are you?', sender: 'user' });
    this.messages.push({ text: "I'm just a virtual assistant, so I don't have feelings, but I'm here and ready to help you with whatever you need! How are you doing? 😊", sender: 'bot' });
    this.messages.push({ text: 'How is weather today', sender: 'user' });
    this.messages.push({ text: "I don't have real-time data access, so I can't check the current weather for you. However, you can easily check the weather using a weather app, website, or by searching for your location on a platform like Google. Let me know if you need help with anything else! 😊", sender: 'bot' });
    
  }

  addMessage(text: string, sender: 'user' | 'bot') {
    this.messages.push({ text, sender });
  }
  // async handleMessage(message: string) {
  //   console.log('User Message:', message);
  //   this.messages.push({ text: message, sender: 'user' });
  //   const html = this.markdownService.parse(message);
  //   const safeHtml = this.sanitizer.bypassSecurityTrustHtml(await html);
  //   this.messages.push({ text: safeHtml, sender: 'bot' });
  // }

  // In your Angular component

  rateResponse(message: Message, feedback: 'like' | 'dislike') {
    if (message.feedback === feedback) {
      message.feedback = undefined; // Toggle off if already selected
    } else {
      message.feedback = feedback;
    }
    console.log(`User ${feedback}d response: "${message.text}"`);
  }


  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.error('Scroll to bottom failed:', err);
    }
  }

  async handleMessage(newMessage: string): Promise<void> {
    const html = await marked.parse(newMessage);
    // ('# Marked in Node.js\n\nRendered by **marked**.');
    // await this.markdownService.parse(newMessage);
    const safeHtml = this.sanitizer.bypassSecurityTrustHtml(html);
    this.messages.push({
      text: safeHtml,
      sender: 'bot'
    });
    this.scrollToBottom();
  }

  ssendMessage(newMessage:any) {
    this.messages.push({ text: newMessage, sender: 'user' });
    this.scrollToBottom();
    const data = {
      chat_session_id: "5bcade5a-fee0-473c-825c-d3de34b335de",
      parent_message_id: 2,
      prompt: "hi",
      ref_file_ids: [],
      thinking_enabled: false,
      search_enabled: false
    };
    const bot_response = "# Jerdon AI Soon Live\n\nWelcome to **Jerdon AI Soon Live** - your go-to solution for tackling problems in seconds.\n\n## Available to Shoot Your Problems in Seconds\n\n- **Fast Response**: Get quick solutions to your issues.\n- **Accessibility**: We're here whenever you need us.\n- **Efficiency**: We handle your problems efficiently and effectively.\n\nFor more information, visit our [website](#) or contact us directly."
    this.handleMessage(bot_response)
    // this.chatService.streamMessages(data, (message1) => {
    //   console.log(message1)
    //   // this.messages.push(message);
    //   // this.messages.push({ text: message1, sender: 'bot' });  // ✅ Display in UI
    //   this.ngZone.run(() => {  // Ensure UI updates
    //     const lastMessage = this.messages[this.messages.length - 1];
  
    //     if (lastMessage && lastMessage.sender === 'bot') {
    //       lastMessage.text += " " + message1; // Append to existing message
    //     } else {
    //       this.messages.push({ text: message1, sender: 'bot' });
    //     }
    //   });
    // });
  }






// This function scrolls the chat container to the bottom
// scrollToBottom(): void {
//   const chatContainer = document.getElementById('chatContainer');
//   console.log(chatContainer)
//   if (chatContainer) {
//     console.log(chatContainer.scrollHeight)
//     chatContainer.scrollTop = chatContainer.scrollHeight*2;
//   }
// }

// Call this function whenever you need to scroll to the bottom, 
// like after adding a new chat message








}
