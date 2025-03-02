import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  chatTopics: string[] = ['General Chat', 'Tech Support', 'AI Chat', 'Customer Support'];

  selectTopic(topic: string) {
    console.log(`Selected Topic: ${topic}`);
  }
}