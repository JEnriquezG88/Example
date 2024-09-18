import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { ContentComponent } from "./components/content/content.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { ResizeService } from './resize.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, ContentComponent, FooterComponent, SettingsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  screenWidth: number = 0;
  percentage: number = 0;

  constructor(@Inject(ResizeService) private resizeService: ResizeService) {}
  
  onMouseDown(event: MouseEvent) {
    this.screenWidth = window.innerWidth;
    this.resizeService.startResize(event);
  }
  getScreenPorcentage() {
    const asideElement = document.querySelector('aside');
    if (asideElement) {
      const asideWidth = asideElement.clientWidth;
      this.percentage = (asideWidth / this.screenWidth) * 100;
      console.log(`Aside width percentage: ${this.percentage.toFixed(2)}%`);
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.resizeService.resize(event);
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.resizeService.stopResize();
    this.getScreenPorcentage();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (this.percentage !== 0) {
      const asideElement = document.querySelector('aside');
      if (asideElement) 
      {
        const newWidth = (this.percentage / 100) * window.innerWidth;
        if(window.innerWidth < 768){
          console.log('Window width is less than 1000px');
          asideElement.style.minWidth = '100vw';
        } else {
          asideElement.style.minWidth = '300px';
          if(newWidth < window.innerWidth - 300){
            asideElement.style.width = `${newWidth}px`;
          } else {
            asideElement.style.width = `${window.innerWidth - 300}px`;
          }
        }
      }
    }
  }
}
