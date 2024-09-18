import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { ContentComponent } from "./components/content/content.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SettingsComponent } from "./components/settings/settings.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, ContentComponent, FooterComponent, SettingsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  resizing: boolean = false;
  startX: number = 0;
  startWidth: number = 0;
  screenWidth: number = 0;

  onMouseDown(event: MouseEvent) {
    this.resizing = true;
    this.startX = event.clientX;
    this.startWidth = document.querySelector('aside')?.offsetWidth || 0;
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.resizing) {
      this.screenWidth = window.innerWidth;
      const newWidth = this.startWidth + (event.clientX - this.startX);
      console.log(this.screenWidth, newWidth);
      const aside = document.querySelector('aside');
      if (aside) {
        aside.style.maxWidth = `${this.screenWidth - 300}px`;
        aside.style.width = `${newWidth}px`;
      }
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.resizing = false;
  }
}
