import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../../models/usuario';

//Este servicio sabe cómo gestionar la API si el usuario tiene acceso a la aplicación

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'http://localhost:3000/usuarios'
  constructor(private http: HttpClient) { }

  login(values: { email: string, password: string }): Observable<Usuario | null> {
    // return this.http.post<Usuario>(`${this.url}/login`, values).pipe(
    //   map(u => new Usuario(u))
    // );

    return this.http.post<Usuario>(`${this.url}/login`, values, { observe: 'response' }).pipe(
      map(u => {
        if (u.status === HttpStatusCode.Unauthorized) {
          return null;
        }
        return new Usuario(u.body)
      }),
      catchError((e: HttpErrorResponse) => {
        if (e.status === HttpStatusCode.InternalServerError) {
          console.log('La API está caída')
        }
        console.log(e);
        return of(null)
      })
    );
  }

  refreshToken(refresh: any): Observable<any> {
    return this.http.post<Usuario>(`${this.url}/login`, {refresh}, { observe: 'response' }).pipe(
      map(u => {
        if (u.status === HttpStatusCode.Unauthorized) {
          return null;
        }
        return new Usuario(u.body)
      }),
      catchError((e: HttpErrorResponse) => {
        if (e.status === HttpStatusCode.InternalServerError) {
          console.log('La API está caída')
        }
        console.log(e);
        return of(null)
      })
    );
  }

}
