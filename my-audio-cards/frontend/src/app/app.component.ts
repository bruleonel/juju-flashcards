import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cards: any[] = [];

  async ngOnInit() {
    this.cards = await (window as any).electronAPI.listCards();
  }
  
}
