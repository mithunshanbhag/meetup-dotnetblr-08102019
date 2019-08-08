import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService, private router: Router) {
    console.log('In AuthGuardService::ctor');
  }

  canActivate(): boolean {
    console.log('In AuthGuardService::canActivate');

    if (this.authService.isAuthenticated()) {
      console.log('authenticated = true');
      return true;
    } else {
      console.log('authenticated = false. Routing to landing page');
      this.router.navigate(['/']);
      return false;
    }
  }
}
