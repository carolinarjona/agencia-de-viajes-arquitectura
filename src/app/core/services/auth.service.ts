import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly APP_USER = 'APP_USER';
  constructor(private loginService: LoginService) { }

  get isUserAuthenticated(): boolean {
    return localStorage.getItem(this.APP_USER) !== null;
  }

  get bearerToken(): string {
    const bearer = localStorage.getItem(this.APP_USER);

    if (bearer) {
      const user: Usuario = JSON.parse(bearer);
      return user.token;
    }

    return '';
  }
  
  get user(): Usuario | null {
    const b = localStorage.getItem(this.APP_USER);

    return b ? new Usuario(b) : null;
  }

  storeUser(usuario: Usuario): void{
    localStorage.setItem(this.APP_USER, JSON.stringify(usuario));
  }

  logoutUser(): void {
    localStorage.removeItem(this.APP_USER);
  }

  initializeRefreshToken(usuario: Usuario): void {
    const expires_in = usuario.expires_in * 0.75;

    setTimeout(() => {
      this.loginService.refreshToken(usuario).subscribe(x => {
        usuario.token = x.token;
        usuario.expires_in = x.expires_in;
        usuario.refresh_token = x . refresh_token;

        this.storeUser(usuario)
      })
    }, expires_in);
  }

}
