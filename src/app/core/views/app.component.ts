import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
// import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  elUsuarioEstaEnLogin = false;
  loading = false;

  constructor(private authService: AuthService, private router: Router, private loaderService: LoaderService) {
    // this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((ev: any) => {
    //   this.elUsuarioEstaEnLogin = ev?.url.toLowerCase().includes('login')
    // })
   }

  ngOnInit(): void {
    this.loaderService.loading.pipe(delay(0)).subscribe(x => {
      this.loading = x;
    })
  }

  cerrarSesion() {
    this.authService.logoutUser();
    this.router.navigate(['login']);
  }

  isUserLogged(): boolean {
    return this.authService.isUserAuthenticated;
  }
}
