import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth0DecodedHash, WebAuth } from 'auth0-js';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // keys for values being stored in localstorage
  // @todo: Perhaps move this to constants.ts?
  private readonly accessTokenKey = 'access_token';
  private readonly idTokenKey = 'id_token';
  private readonly expiresAtKey = 'expires_at';

  private authClient: WebAuth;

  constructor(private router: Router) {
    this.authClient = new WebAuth({
      domain: Constants.auth0Domain,
      clientID: Constants.auth0ClientId,
      responseType: Constants.auth0ResponseType,
      redirectUri: Constants.auth0RedirectUri,
      scope: Constants.auth0Scope,
    });
  }

  login() {
    this.authClient.authorize();
  }

  logout() {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.idTokenKey);
    localStorage.removeItem(this.expiresAtKey);
  }

  isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem(this.expiresAtKey) || '{}');
    return new Date().getTime() < expiresAt;
  }

  handleAuthentication() {
    this.authClient.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        // clear the hash fragment from the address bar
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/protected']);
      } else if (err) {
        console.log(err);
      }
    });
  }

  private setSession(authResult: Auth0DecodedHash) {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

    localStorage.setItem(this.accessTokenKey, authResult.accessToken);
    localStorage.setItem(this.idTokenKey, authResult.idToken);
    localStorage.setItem(this.expiresAtKey, expiresAt);
  }

  public getProfileAsync(callback) {
    this.authClient.client.userInfo(
      localStorage.getItem(this.accessTokenKey),
      (err, result) => callback(err, result));
  }

  public getAccessToken(): string {
    return localStorage[this.accessTokenKey];
  }
}
