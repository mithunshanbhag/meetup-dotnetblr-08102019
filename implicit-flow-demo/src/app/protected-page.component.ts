import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-protected',
  template: `
  <div style="text-align:center">
    <h1>{{title}}</h1>
  </div>    
`,
  styles: []
})
export class ProtectedPageComponent implements OnInit {
  title = 'demo: implicit flow (protected-page-component)';

  constructor() {
    console.log('In ProtectedComponent::ctor');
  }

  ngOnInit() {
  }
}
