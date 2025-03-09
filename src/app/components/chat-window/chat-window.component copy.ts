// import { Component, OnInit, OnDestroy, NgZone, ViewChild, ElementRef, inject } from '@angular/core';
// // import { Message } from './message.model';
// import { ChatService } from 'src/app/chat.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Subject, concatMap } from 'rxjs';
// // import { v4 as uuidv4 } from 'uuid';
// import { Message } from './message.model';
// import { v4 as uuidv4 } from 'uuid';


// @Component({
//   selector: 'app-chat-window1',
//   // templateUrl: './chat-window1.component.html',
//   // styleUrls: ['./chat-window1.component.scss']
// })
// export class ChatWindowComponent implements OnInit, OnDestroy {
//   @ViewChild('chatContainer') private chatContainer!: ElementRef;

//   messages: Message[] = [];
//   currentThreadId: string | null = null;
//   shouldScroll = true;

//   private _snackBar = inject(MatSnackBar);
//   private messageQueue = new Subject<string>();

//   constructor(
//     private chatService: ChatService,
//     private ngZone: NgZone
//   ) {}

//   ngOnInit(): void {
//     this.messageQueue.pipe(
//       concatMap(message => this.sendMessageToBackend(message))
//     ).subscribe();

//     this.loadInitialMessages();
//   }

//   // Load demo messages
//   loadInitialMessages() {
//     this.messages = [
//       { id: uuidv4(), text: 'Hi', sender: 'user' },
//       { id: uuidv4(), text: 'Hello! How can I assist you today?', sender: 'bot', parentId: this.currentThreadId },
//       { id: uuidv4(), text: 'How are you?', sender: 'user', parentId: this.currentThreadId },
//       { id: uuidv4(), text: "I'm just a virtual assistant, ready to help!", sender: 'bot', parentId: this.currentThreadId }
//     ];
//     this.scrollToBottom();
//   }

//   // Track by ID to prevent re-rendering of existing elements
//   trackByMessageId(index: number, message: Message): string {
//     return `${message.id}-${message.parentId || 'root'}`;
//   }

//   // ✅ Handle user input
//   handleUserMessage(newMessage: string) {
//     if (!newMessage.trim()) return;

//     const messageId = uuidv4();

//     if (!this.currentThreadId) {
//       this.currentThreadId = messageId;
//     }

//     this.addMessage(newMessage, 'user', this.currentThreadId);

//     this.messageQueue.next(newMessage);
//   }

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
//     // this.messages.push({
//     //   id: messageId,
//     //   text: content,
//     //   sender: 'bot',
//     //   parentId: parentId ? parentId : null,
//     //   isStreaming: true
//     // });
//     this.messages.forEach(
//       data1=>{
//         console.log(data)
//         this.messages.push(
//           {
//             id:data1.id,
//             text:"ok",
//             sender:"bot",
//             parentId:data1.parentId
//           }

//         )
//       }

//     )










//   }

//   // ✅ Force UI state update
//   this.ngZone.run(() => this.messages = [...this.messages]);
//   this.scrollToBottom();
// }

//   // ✅ Send message to backend and process response
//   private async sendMessageToBackend(newMessage: string) {

//     this.messages.forEach(
//       data1=>{
//         console.log(data1)
//         this.messages.push(
//           {
//             id:data1.id,
//             text:"ok",
//             sender:"bot",
//             parentId:data1.parentId
//           }

//         )
//       }

//     )






//     // const parentId = this.currentThreadId || uuidv4();

//     // this.addMessage('AI is typing...', 'bot', parentId, true);

//     // // try {
//     //   const response = await this.chatService.getResponse(newMessage,parentId,(data) => {
//     //     this.handleStreamedMessage(data);
//     //   });
//     //   console.log(response)
//     // // //   this.messages = this.messages.filter(msg => msg.text !== 'AI is typing...');
//     //   // this.addMessage("response", 'bot', parentId);
//     //   // this.addMessage("response", 'bot', parentId);
//     //   // this.addMessage("response", 'bot', parentId);
//     //   // this.addMessage("response", 'bot', parentId);
//     //   // this.addMessage("response", 'bot', parentId);
//     //   // this.addMessage("response", 'bot', parentId);
//     //   // this.addMessage("response", 'bot', parentId);
//     // // } catch (err) {
//     // //   console.error('Error getting response:', err);
//     // // }
//   }

//   // ✅ Add message to the state
//   addMessage(text: string, sender: 'user' | 'bot', parentId?: string | null, isTemporary = false) {
//     const newMessage: Message = {
//       id: uuidv4(),
//       text,
//       sender,
//       parentId,
//       isStreaming: isTemporary
//     };

//     this.messages.push(newMessage);
//     this.ngZone.run(() => this.messages = [...this.messages]);
//     this.scrollToBottom();
//   }

//   // ✅ Scroll to bottom
//   scrollToBottom(): void {
//     setTimeout(() => {
//       this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
//     }, 10);
//   }

//   ngOnDestroy(): void {
//     this.messageQueue.complete();
//   }
// }


