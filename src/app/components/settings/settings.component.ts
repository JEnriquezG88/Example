import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChangeThemeService } from '../../services/change-theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  constructor(private changeThemeService: ChangeThemeService) {}

  settingsActice: boolean = false;
  darkMode: boolean = true;
  darkVariable: string = 'light';

  toggleSettings() {
    this.settingsActice = !this.settingsActice;
    this.darkVariable = this.darkMode ? 'dark' : 'light';
  }
  toggleMode() {
    this.darkMode = !this.darkMode;
    this.changeThemeService.changeTheme();
  }
}
