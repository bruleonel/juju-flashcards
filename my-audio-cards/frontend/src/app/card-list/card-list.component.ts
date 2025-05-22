import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent implements OnInit {
  cards: any[] = [];

  async ngOnInit() {
    this.cards = await (window as any).electronAPI.listCards();
  }

  playAudio(path: string) {
    const audio = new Audio(path);
    audio.play();
  }
}
