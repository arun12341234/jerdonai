import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  chatTopics: string[] = ['General Chat', 'Tech Support', 'AI Chat', 'Customer Support'];

  ngOnInit(): void {
  }
  selectTopic(topic: string) {
    console.log(`Selected Topic: ${topic}`);
  }
}