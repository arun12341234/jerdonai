import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as marked from 'marked';
import { MarkdownService } from '../markdown.service';
@Component({
  selector: 'app-jerdon-airesponse-viewer',
  templateUrl: './jerdon-airesponse-viewer.component.html',
  styleUrls: ['./jerdon-airesponse-viewer.component.scss']
})
export class JerdonAIResponseViewerComponent {
  @Input() text: string = '';
  safeHtml!: SafeHtml;

  constructor(private markdownService: MarkdownService,
    private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(marked(this.text));
    // const html = this.markdownService.parse("newMessage");
    // const safeHtml = this.sanitizer.bypassSecurityTrustHtml(html);
    // this.messages.push({
    //   text: safeHtml,
    //   sender: 'User',
    //   timestamp: new Date()
    // });
    this.onSendMessage("hello")
  }
  async onSendMessage(newMessage: string): Promise<void> {
    const html = await this.markdownService.parse(newMessage);
    const safeHtml = this.sanitizer.bypassSecurityTrustHtml(html);
    // this.messages.push({
    //   text: safeHtml,
    //   sender: 'User',
    //   timestamp: new Date()
    // });
  }
}