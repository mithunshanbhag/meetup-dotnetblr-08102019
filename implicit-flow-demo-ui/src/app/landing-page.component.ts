import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-landing-page',
  template: `
    <div style="text-align:center">
      <h1>{{title}}</h1>
      <button (click)="authService.login()">login</button>
    </div>
  `,
  styles: []
})
export class LandingPageComponent implements OnInit {
  title = 'demo: implicit flow (landing page)';

  constructor(public authService: AuthService) {
    console.log('In LandingPageComponent::ctor');
  }

  ngOnInit() {
    console.log('In LandingPageComponent::ngOnInit');
  }
}
