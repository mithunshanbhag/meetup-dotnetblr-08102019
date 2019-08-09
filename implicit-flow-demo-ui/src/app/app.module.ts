import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthCallbackComponent } from './auth-callback.component';
import { AuthGuardService } from './auth-guard.service';
import { LandingPageComponent } from './landing-page.component';
import { ProtectedPageComponent } from './protected-page.component';

const appRoutes: Routes = [
  { path: 'authcallback', component: AuthCallbackComponent },
  { path: 'protected', component: ProtectedPageComponent, canActivate: [AuthGuardService] },
  { path: '', component: LandingPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AuthCallbackComponent,
    LandingPageComponent,
    ProtectedPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
