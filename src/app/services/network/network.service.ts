import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVERIP } from '../../../environments/environment';
import { LoginCookieService } from '../cookie/login-cookie.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private httpClient: HttpClient, public loginCookieService: LoginCookieService) { }

  /* Accounts *////////////////////////////////////////////////////////////////////////////////////
  async login(body) {
    return await this.httpClient.post(`${SERVERIP}/account/login`, body, this.httpOptions).toPromise();
  }

  async forgotPassword(body) {
    return await this.httpClient.post(`${SERVERIP}/account/forgot`, body, this.httpOptions).toPromise();
  }

  async create(body) {
    return await this.httpClient.post(`${SERVERIP}/account/create`, body, this.httpOptions).toPromise();
  }

  async newPassword(body) {
    return await this.httpClient.post(`${SERVERIP}/account/newPassword`, body, this.httpOptions).toPromise();
  }

  async isLogged() {
    let session = await this.loginCookieService.getLogin();
    return await this.httpClient.post(`${SERVERIP}/account/isLoggedIn`, {cookie: session}, this.httpOptions).toPromise();
  }
  /* */////////////////////////////////////////////////////////////////////////////////////////////

}
