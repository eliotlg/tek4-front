import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  text = "";
  height = 85;

  constructor() { }

  public getHeight() {
    return (this.height);
  }

  public getString() {
    return (this.text);
  }

}
