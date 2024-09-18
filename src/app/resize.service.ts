import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {
  private resizing = new BehaviorSubject<boolean>(false);
  private startX = 0;
  private startWidth = 0;
  private screenWidth = window.innerWidth;

  resizing$ = this.resizing.asObservable();

  startResize(event: MouseEvent) {
    this.resizing.next(true);
    this.startX = event.clientX;
    this.startWidth = document.querySelector('aside')?.offsetWidth || 0;
    event.preventDefault();
  }

  resize(event: MouseEvent) {
    if (this.resizing.getValue()) {
      this.screenWidth = window.innerWidth;
      const newWidth = this.startWidth + (event.clientX - this.startX);
      const aside = document.querySelector('aside');
      if (aside) {
        aside.style.maxWidth = `${this.screenWidth - 300}px`;
        aside.style.width = `${newWidth}px`;
      }
    }
  }

  stopResize() {
    this.resizing.next(false);
  }
}
