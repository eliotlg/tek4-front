import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NetworkService } from '../services/network/network.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public networkService: NetworkService, public router: Router) {}

  canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      this.networkService.isLogged().then((response: any) => {
        if (response.success == true) {
          resolve(true);
        } else {
          this.router.navigate(['account/login']);
          resolve(false);
        }
      }).catch((err) => {
        console.error(err);
        this.router.navigate(['account/login']);
        resolve(false);
      });
    });
  }
  
}
