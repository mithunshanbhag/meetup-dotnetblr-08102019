import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth-callback',
  template: `
      <div style="text-align:center">
        <h1>{{title}}</h1>
      </div>
`,
  styles: []
})
export class AuthCallbackComponent implements OnInit {
  title = 'demo: implicit flow (authcallback)';

  constructor(private router: Router, private authService: AuthService) {
    console.log('In AuthCallbackComponent::ctor');
  }

  ngOnInit() {
    console.log('In AuthCallbackComponent::ngOnInit');
    this.authService.handleAuthentication();
  }
}
