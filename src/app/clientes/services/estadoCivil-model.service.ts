import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { EstadoCivil } from '../models/estadoCivil';

@Injectable({
  providedIn: 'root',
})
export class EstadosCivilesModelService {
  private url = 'http://localhost:3000';


  constructor(private http: HttpClient, private authService: AuthService) {}

  getAll(): Observable<EstadoCivil[]> {
    return this.http.get<EstadoCivil[]>(`${this.url}/estadosCiviles`).pipe(
      map((estados) =>
        estados.map((e: EstadoCivil) => {
          return new EstadoCivil(e);
        })
      )
    );
  }
}