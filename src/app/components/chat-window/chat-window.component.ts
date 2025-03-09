import { Component, OnInit, OnDestroy, NgZone, ViewChild, ElementRef, inject } from '@angular/core';
// import { Message } from './message.model';
import { ChatService } from 'src/app/chat.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, concatMap } from 'rxjs';
// import { v4 as uuidv4 } from 'uuid';
import { Message } from './message.model';
import { v4 as uuidv4 } from 'uuid';
import { marked } from 'marked';
// import * as marked from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ChatInputComponent } from "../chat-input/chat-input.component";

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent implements OnInit {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  messages: Message[] = [];
  currentThreadId: string | null = null;
  shouldScroll = true;

  private _snackBar = inject(MatSnackBar);
  private parsedCache = new Map<string, string>();
  messages1: any[] = [];
  partialMessage: any = '';


  constructor(
    private chatService: ChatService,
    private ngZone: NgZone,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {


    this.loadInitialMessages();
  }
// Strip Markdown syntax and return plain text
stripMarkdown(markdown: string | undefined | null): string {
  if (typeof markdown !== 'string') {
    console.warn('stripMarkdown: Expected a string, but got:', markdown);
    return '';
  }

  // Remove Markdown syntax
  let plainText = markdown
    .replace(/#+\s*/g, '') // Headings
    .replace(/\*\*|\*/g, '') // Bold/italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
    .replace(/!\[([^\]]+)\]\([^)]+\)/g, '') // Images
    .replace(/^\s*[-*+]\s+/gm, '') // Lists
    .replace(/^>\s*/gm, '') // Blockquotes
    .replace(/```[\s\S]*?```/g, '') // Code blocks
    .replace(/`([^`]+)`/g, '$1') // Inline code
    .trim(); // Trim extra spaces

  return plainText;
}
  // Load demo messages
  loadInitialMessages() {















    this.chatService.getData().subscribe((response) => {
      // console.log('JSON Data:', response.data.biz_data.chat_messages);
      this.messages1 = response.data.biz_data.chat_messages;
      // document.getElementById('chat-message').innerHTML 
      // console.log(document.getElementsByClassName('ASSISTANT')[0])
      this.messages1.forEach(ele => {
        if (ele.role === 'ASSISTANT') {
          ele.content = marked.parse(ele.content);  // Parse content if role is 'ASSISTANT'
        }
        // Optionally log the parsed content
        // console.log(marked.parse(ele.content));
      });
      
      console.log(this.messages1)
      this.messages = this.messages1;

      // document.getElementsByClassName('ASSISTANT').forEach(element => {
      //     console.log(element)
        
      // });
      // = marked.parse(messageContent);
    });
    // this.messages = [
    //   { id: uuidv4(), text: 'Hi', sender: 'user' },
    //   { id: uuidv4(), text: 'Hello! How can I assist you today?', sender: 'bot', parentId: this.currentThreadId },
    //   { id: uuidv4(), text: 'How are you?', sender: 'user', parentId: this.currentThreadId },
    //   { id: uuidv4(), text: "I'm just a virtual assistant, ready to help!", sender: 'bot', parentId: this.currentThreadId }
    // ];
  }

  // async getSanitizedHTML(content: any) {
  //   // return this.sanitizer.bypassSecurityTrustHtml(marked.parse(content));
  //   return this.sanitizer.bypassSecurityTrustHtml(await marked.parse(content));
  // }

// // Async function to handle async marked.parse
// async getSanitizedHTML(content: string) {
//   // Await the Promise returned by marked.parse()
//   const htmlContent = await marked.parse(content);
//   // Sanitize the parsed HTML content before using it in the template
//   return this.sanitizer.bypassSecurityTrustHtml(htmlContent);
// }


async getSanitizedHTML(content: string) {
  // if (this.parsedCache.has(content)) {
  //   return this.sanitizer.bypassSecurityTrustHtml(this.parsedCache.get(content));
  // }

  const htmlContent = await marked.parse(content);
  this.parsedCache.set(content, htmlContent);  // Cache parsed content
  return this.sanitizer.bypassSecurityTrustHtml(htmlContent);
}




  // Track by ID to prevent re-rendering of existing elements
  // trackByMessageId(index: number, message: Message): string {
  //   return `${message.id}-${message.parentId || 'root'}`;
  // }

  // ✅ Handle user input
  handleUserMessage(newMessage: any) {
    if (!newMessage.trim()) return;
    let _n_umessage = {
      "status": "FINISHED",
      "accumulated_token_usage": 18,
      "files": [],
      "tips": [],
      "inserted_at": 1741456405.808636,
      "search_enabled": false,
      "search_status": null,
      "search_results": null,
      "message_id": 1,
      "parent_id": null,
      "model": "",
      "role": "USER",
      "content": "hi",
      "thinking_enabled": false,
      "thinking_content": null,
      "thinking_elapsed_secs": null,
      "ban_edit": false,
      "ban_regenerate": false,
  
  }
    this.messages.push(_n_umessage);
        // Subscribe to the event stream
        this.chatService.getDataRes().subscribe(response => {
          // if(response!= '  '){
          //   console.log('Streamed Data:', response,"end");
          // }
          if (response.startsWith("data: ")) {
            try {
              const parsedData = JSON.parse(response.replace("data: ", "").trim());
              const newText = parsedData.choices[0].delta.content || "";
    
              if (newText) {
                // console.log(
                //   newText
                // )
                this.partialMessage += newText;
                let abc = this.messages;
    
                // callback(newText.trim());
                // console.log(this.partialMessage);
                // console.log(this.messages, parsedData, parsedData['message_id'])
                // const userMessages = this.messages.filter(message1 => console.log(message1['message_id']) );
                // console.log(abc[abc.length-1]);
                if(abc[abc.length-1]['message_id'] != parsedData['message_id']){
                  console.log("push")
                  let _nmessage = {
                    "status": "FINISHED",
                    "accumulated_token_usage": 18,
                    "files": [],
                    "tips": [],
                    "inserted_at": 1741456405.808636,
                    "search_enabled": false,
                    "search_status": null,
                    "search_results": null,
                    "message_id": 1,
                    "parent_id": null,
                    "model": "",
                    "role": "USER",
                    "content": "hi",
                    "thinking_enabled": false,
                    "thinking_content": null,
                    "thinking_elapsed_secs": null,
                    "ban_edit": false,
                    "ban_regenerate": false,
                
                }
                _nmessage["message_id"] = parsedData['message_id'];
                _nmessage["parent_id"] = parsedData['parent_id'];
                _nmessage["role"] = 'ASSISTANT';
                _nmessage["content"] = this.partialMessage.trim();
                this.messages.push(_nmessage);
                console.log(_nmessage, this.messages)
    
                }
                else{
                  abc[abc.length-1]['content']= marked.parse(this.partialMessage.trim());
                  console.log("append")
                }
                // abc[abc.length]['content'] = this.partialMessage
                
                // Send message only if a sentence is completed
                // if (/[.!?]$/.test(newText)) {
                //   callback(partialMessage.trim());
                //   partialMessage = "";
                // }
              }
            } catch (e) {
              console.error("Error parsing JSON:", e);
            }
          }
          // const reader = response.stream().getReader();  // Get the file stream reader
          // console.log(reader)
        });
    

    // const messageId = uuidv4();

    // if (!this.currentThreadId) {
    //   this.currentThreadId = messageId;
    // }

    // this.addMessage(newMessage, 'user', this.currentThreadId);

  }

// // ✅ Handle token streaming from AI
// handleStreamedMessage(data: any) {
//   const messageId = String(data.message_id);
//   const parentId = String(data.parent_id);
//   const content = data.choices[0]?.delta?.content || '';

//   // ✅ Find existing message by message_id
//   const existingMessage = this.messages.find(m => m.id === messageId);

//   if (existingMessage) {
//     // ✅ Append token to existing message
//     existingMessage.text += content;
//   } else {
//     // ✅ Create a new message only if it's a new ID
//     this.messages.push({
//       id: messageId,
//       text: content,
//       sender: 'bot',
//       parentId: parentId ? parentId : null,
//       isStreaming: true
//     });
//   }

//   // ✅ Force UI state update
//   this.ngZone.run(() => this.messages = [...this.messages]);
//   this.scrollToBottom();
// }

  // ✅ Send message to backend and process response
  // private async sendMessageToBackend(newMessage: string) {
  //   const parentId = this.currentThreadId || uuidv4();

  //   this.addMessage('AI is typing...', 'bot', parentId, true);

  //   // try {
  //     const response = await this.chatService.getResponse(newMessage,parentId,(data) => {
  //       this.handleStreamedMessage(data);
  //     });
  //     console.log(response)
  //   // //   this.messages = this.messages.filter(msg => msg.text !== 'AI is typing...');
  //   //   this.addMessage("response", 'bot', parentId);
  //   //   this.addMessage("response", 'bot', parentId);
  //   //   this.addMessage("response", 'bot', parentId);
  //   //   this.addMessage("response", 'bot', parentId);
  //   //   this.addMessage("response", 'bot', parentId);
  //   //   this.addMessage("response", 'bot', parentId);
  //   //   this.addMessage("response", 'bot', parentId);
  //   // } catch (err) {
  //   //   console.error('Error getting response:', err);
  //   // }
  // }

  // ✅ Add message to the state
  // addMessage(text: string, sender: 'user' | 'bot', parentId?: string | null, isTemporary = false) {
  //   const newMessage: Message = {
  //     id: uuidv4(),
  //     text,
  //     sender,
  //     parentId,
  //     isStreaming: isTemporary
  //   };

  //   this.messages.push(newMessage);
  //   this.ngZone.run(() => this.messages = [...this.messages]);
  //   this.scrollToBottom();
  // }

  // ✅ Scroll to bottom
  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.error('Scroll to bottom failed:', err);
    }
  }
  // ngOnDestroy(): void {
  //   // this.scrollToBottom()
  // }
  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
    this.scrollToBottom();
    }
  }


async copyResponse(html: SafeHtml | string | undefined | null): Promise<void> {
  this.shouldScroll = false; // Disable scrolling temporarily
  let rawHtml:any

  // Extract raw HTML from SafeHtmlImpl
  if (typeof html === 'object' && html !== null && 'changingThisBreaksApplicationSecurity' in html) {
    rawHtml = html.changingThisBreaksApplicationSecurity;
  } else if (typeof html === 'string') {
    rawHtml = html;
  } else {
    console.error('copyResponse: Expected a string or SafeHtml, but got:', html);
    return;
  }

  // Strip HTML tags and get plain text
  const plainText = this.stripHtmlTags(rawHtml);
  // console.log('Plain text:', plainText);

  try {
    // Try using the modern clipboard API
    await navigator.clipboard.writeText(plainText);
    // console.log('Copied to clipboard:', plainText);
    // toastr.options.positionClass = 'toast-top-center';
    // toastr.success('Copied to clipboard');
    this._snackBar.open('Copied to clipboard', 'close',{
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration:1000
    });
    // this._snackBar.openFromComponent(SbarComponent, {
    // open('Copied to clipboard', '', {
    //   horizontalPosition: "center",
    //   verticalPosition: "top",
    //   duration: 1000,
    // });
  } catch (err) {
    console.error('Modern clipboard API failed, using fallback:', err);
    this.fallbackCopyText(plainText);
  }
}

// Utility function to strip HTML tags
stripHtmlTags(html: string): string {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = html;
  return tempElement.textContent || tempElement.innerText || '';
}


// Fallback for copying text (for older browsers)
private fallbackCopyText(text: string): void {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      // console.log('Fallback copy successful:', text);
    } else {
      console.error('Fallback copy failed');
    }
  } catch (fallbackErr) {
    console.error('Fallback copy error:', fallbackErr);
  } finally {
    document.body.removeChild(textArea);
  }
}
rateResponse(message:any, rate:any) {
  console.log(message, rate)
}
}