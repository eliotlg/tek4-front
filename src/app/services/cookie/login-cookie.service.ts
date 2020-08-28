import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { COOKIE_SESSION } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginCookieService {

  constructor(public cookieService: CookieService) {}

  async setLogin(login) {
    await this.cookieService.set(COOKIE_SESSION, login);
  }

  async getLogin() {
    return await this.cookieService.get(COOKIE_SESSION);
  }
}
