import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { HotToastModule } from '@ngneat/hot-toast';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HttpAuthInterceptor } from './services/http-auth.interceptor';
import { HttpErrorInterceptor } from './services/http-error.interceptor';
import { LoadingIndicatorInterceptor } from './services/loading-indicator.interceptor';
import { AppComponent } from './views/app.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    HotToastModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingIndicatorInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true
    },
    {
      provide: LOCALE_ID, useValue: 'es'
    },
    {
      provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'
    }
  ],
  exports: [
    AppComponent
  ]
})
export class CoreModule { }
