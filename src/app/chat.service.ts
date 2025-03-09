import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concatMap, Observable, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://localhost:8000/chat/';
  private apiUrl1 = 'http://127.0.0.1:8000/chat/';
  // private apiUrl2 = 'https://chat.deepseek.com/api/v0/chat/completion';

  constructor(private http: HttpClient) {}


  // Method to fetch JSON data
  getData(): Observable<any> {
    return this.http.get('assets/hisytor_chat.json');
  }

  getDataRes(): Observable<any> {
    return this.http.get('assets/response.txt', { responseType: 'text' }).pipe(
      concatMap((fileData: string) => {
        // Simulate a delay of 500ms for each chunk of data
        return this.simulateStream(fileData);
      })
    );
  }

// Simulate streaming the text with a delay for each chunk
simulateStream(fileData: string): Observable<string> {
  const delayTime = 50; // Delay in milliseconds
  const chunks = fileData.split('\n'); // Split the text into chunks (line by line)

  // Create an observable that emits each chunk with a delay
  return new Observable<string>(observer => {
    let index = 0;

    // Emit each chunk with a delay
    const interval = setInterval(() => {
      if (index < chunks.length) {
        observer.next(chunks[index]); // Emit chunk
        index++;
      } else {
        observer.complete(); // Complete once all chunks are emitted
        clearInterval(interval); // Clear the interval
      }
    }, delayTime);
  });
}








  // Function to fetch data periodically
  getDataStream(): Observable<any> {
    return timer(0, 5000).pipe(  // Start immediately and repeat every 5 seconds
      switchMap(() => this.http.get('assets/response.txt'))  // Make the HTTP request every interval
    );
  }





// ✅ Add callback function
async getResponse(prompt: string, parentId: string, callback: (data: any) => void): Promise<void> {
  const requestBody = {
    prompt,
    parent_id: parentId || null
  };

  // ✅ Static example of token streaming
  const chunks = [
      `{"choices":[{"index":0,"delta":{"content":"Hello","type":"text"}}],"message_id":68,"parent_id":67}`,
      `{"choices":[{"index":0,"delta":{"content":"!","type":"text"}}],"message_id":68,"parent_id":66}`,
      `{"choices":[{"index":0,"delta":{"content":" How","type":"text"}}],"message_id":68,"parent_id":67}`,
      `{"choices":[{"index":0,"delta":{"content":" are","type":"text"}}],"message_id":68,"parent_id":67}`,
      `{"choices":[{"index":0,"delta":{"content":" you","type":"text"}}],"message_id":68,"parent_id":67}`,
      `{"choices":[{"index":0,"delta":{"content":"?","type":"text"}}],"message_id":68,"parent_id":67}`
  ];

  for (const [index, data] of chunks.entries()) {
      try {
          // ✅ Simulate streaming delay
          await new Promise(resolve => setTimeout(resolve, index * 500));

          // ✅ Parse the JSON string into an object
          const parsedData = JSON.parse(data);
          console.log('Parsed token:', parsedData);

          // ✅ Call the callback directly
          callback(parsedData);
      } catch (err) {
          console.error('Error parsing JSON chunk:', err);
      }
  }
}


    // const response = await fetch(this.apiUrl, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(requestBody)
    // });

    // ✅ Handle streaming using ReadableStream
    // if (response.body) {
    //   const reader = response.body.getReader();
    //   let decoder = new TextDecoder();

    //   while (true) {
    //     const { value, done } = await reader.read();

    //     if (done) break;

    //     // ✅ Decode the chunked response
    //     const chunk = decoder.decode(value, { stream: true });
    //     console.log('Chunk received:', chunk);

    //     // ✅ Split on newlines (in case of multiple tokens)
    //     const chunks = chunk.split('\n').filter(line => line.trim() !== '');

    //     for (const data of chunks) {
    //       try {
    //         const parsedData = JSON.parse(data);
    //         console.log('Parsed token:', parsedData);

    //         // ✅ Send token to handleStreamedMessage()
    //         window.dispatchEvent(new CustomEvent('stream-token', { detail: parsedData }));
    //       } catch (err) {
    //         console.error('Error parsing JSON chunk:', err);
    //       }
    //     }
    //   }
    // }
  // }














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