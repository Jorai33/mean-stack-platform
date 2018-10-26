import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  isAuthenticated: boolean = true;
  // isAuthenticated: boolean = false;

  constructor() {

  }

}