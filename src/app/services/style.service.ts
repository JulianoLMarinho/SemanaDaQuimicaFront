import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StyleService {
  primary: string;
  secondary: string;
  text_primary: string;
  text_secondary: string;
  constructor() {
    this.primary = "#004a9f";
    this.secondary = "#002b5c";
    this.text_primary = "#fff";
    this.text_secondary = "#fff";
  }
}
