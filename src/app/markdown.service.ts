// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class MarkdownService {

//   constructor() { }
// }
// markdown.service.ts
import { Injectable } from '@angular/core';
import * as marked from 'marked';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {
  
  constructor() {
    // Optional: Set options for marked if needed
    marked.setOptions({
      gfm: true,
      breaks: true
    });
  }

  async parse(markdown: string): Promise<string> {
    return await marked.parse(markdown);
  }
}
