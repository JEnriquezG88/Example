import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangeThemeService {
  private theme: Theme = Theme.Light;

  changeTheme(){
    const elements = document.querySelectorAll(`.${this.theme === Theme.Light ? 'light' : 'dark'}`);
    elements.forEach(elements => {
      elements.classList.remove(this.theme === Theme.Light ? 'light' : 'dark');
      elements.classList.add(this.theme === Theme.Light ? 'dark' : 'light');
    })
    this.theme = this.theme === Theme.Light ? Theme.Dark : Theme.Light;
  }
  
}

enum Theme {
  Light,
  Dark
}