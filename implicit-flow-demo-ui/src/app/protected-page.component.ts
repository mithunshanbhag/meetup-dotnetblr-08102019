import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-protected',
  template: `
  <div style="text-align:center">
    <h1>{{title}}</h1>
    <p>welcome {{userName | async}}</p>
    <img src="{{ userPic | async}}"/>
  </div>
`,
  styles: []
})
export class ProtectedPageComponent implements OnInit {
  title = 'demo: implicit flow (protected page)';

  userName: Observable<string>;
  userPic: Observable<string>;

  constructor(private authService: AuthService) {
    console.log('In ProtectedComponent::ctor');
  }

  ngOnInit() {
    console.log('In ProtectedPageComponent::ngOnInit');

    this.authService.getProfileAsync((err, profile) => {
      if (err) {
        console.error(err);
      } else {
         this.userName = of(profile.email);
         this.userPic = of(profile.picture)
      }
    });
  }
}
