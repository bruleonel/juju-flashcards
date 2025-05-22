import { Component } from '@angular/core';

@Component({
  selector: 'app-card-editor',
  templateUrl: './card-editor.component.html',
})
export class CardEditorComponent {
  frontText = '';
  backText = '';
  frontAudioBlob: Blob | null = null;
  backAudioBlob: Blob | null = null;

  private mediaRecorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];
  private currentSide: 'front' | 'back' | null = null;

  async record(side: 'front' | 'back') {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.currentSide = side;
      this.chunks = [];

      this.mediaRecorder.ondataavailable = e => {
        this.chunks.push(e.data);
      };

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: 'audio/webm' });
        if (this.currentSide === 'front') {
          this.frontAudioBlob = blob;
        } else if (this.currentSide === 'back') {
          this.backAudioBlob = blob;
        }
        this.mediaRecorder = null;
        this.currentSide = null;
      };

      this.mediaRecorder.start();
      console.log(`Gravando áudio (${side})...`);
    } catch (err) {
      console.error('Erro ao acessar microfone:', err);
    }
  }

  saveCard() {
    if (!this.frontText || !this.backText || !this.frontAudioBlob || !this.backAudioBlob) {
      alert('Preencha todos os campos e grave os dois áudios.');
      return;
    }

    const reader1 = new FileReader();
    const reader2 = new FileReader();

    reader1.onloadend = () => {
      reader2.onloadend = () => {
        const frontAudioBase64 = (reader1.result as string).split(',')[1];
        const backAudioBase64 = (reader2.result as string).split(',')[1];

        const cardData = {
          frontText: this.frontText,
          backText: this.backText,
          frontAudio: frontAudioBase64,
          backAudio: backAudioBase64,
        };

        (window as any).electronAPI.saveCard(cardData);
      };

      reader2.readAsDataURL(this.backAudioBlob!);
    };

    reader1.readAsDataURL(this.frontAudioBlob!);
  }
}
