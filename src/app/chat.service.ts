import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://localhost:8000/chat/';
  private apiUrl1 = 'http://127.0.0.1:8000/chat/';
  // private apiUrl2 = 'https://chat.deepseek.com/api/v0/chat/completion';

  constructor(private http: HttpClient) {}

  getAnswer(question: string) {
    return this.http.post<{ reply: string }>(this.apiUrl, { question });
  }

  async streamMessages(data: any, callback: (message: string) => void) {
    try {
      const response = await fetch(this.apiUrl1, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      if (!response.body) {
        console.error("Response body is null.");
        return;
      }
  
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let partialMessage = "";
  
      const readStream = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            console.log("Stream finished");
            // callback(partialMessage.trim()); // Send remaining text
            break;
          }
  
          const text = decoder.decode(value, { stream: true });
  
          text.split("\n\n").forEach(chunk => {
            if (chunk.startsWith("data: ")) {
              try {
                const parsedData = JSON.parse(chunk.replace("data: ", "").trim());
                const newText = parsedData.choices[0].delta.content || "";
  
                if (newText) {
                  partialMessage += newText + " ";
                  callback(newText.trim());
                  
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
          });
        }
      };
  
      readStream();
  
    } catch (error) {
      console.error("Streaming error:", error);
    }
  }
  
  
  
}