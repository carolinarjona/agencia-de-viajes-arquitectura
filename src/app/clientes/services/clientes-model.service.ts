import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { Cliente } from '../models/cliente';
import { ClienteListItem } from '../models/cliente-list-item';
import { ClienteDelete } from '../models/clienteDelete';

@Injectable({
  providedIn: 'root'
})
export class ClientesModelService {

  private url = 'http://localhost:3000'

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAll(): Observable<ClienteListItem[]> {
    return this.http.get<ClienteListItem[]>(`${this.url}/clientes`).pipe(
      map((x) =>
        x.map((c: any) => {
          const cliente = new ClienteListItem(c);
          cliente.estadoCivilDesc = c.estadoCivil?.estadoCivilDesc ?? '';
          return cliente;
        })
      )
    );
  }

  getById(id: string): Observable<Cliente | null> {
    if (!id) {
      return of(null);
    }
    return this.http.get<Cliente>(`${this.url}/clientes/${id}`).pipe(
      map(cliente => new Cliente(cliente))
    )
  }


  save(cliente: Cliente): Observable<Cliente | null> {
    if (!cliente) {
      return of(null);
    }
    return cliente?.id ?
      this.http.put<Cliente>(`${this.url}/clientes/${cliente.id}`, cliente).pipe(
        map(cliente => new Cliente(cliente))
      ) :
      this.http.post<Cliente>(`${this.url}/clientes/`, cliente).pipe(
        map(cliente => new Cliente(cliente))
      )
  }

  delete(id: string): Observable<Boolean | null> {
    if (id) {
      return this.http.delete<ClienteDelete>(`${this.url}/clientes/${id}`).pipe(map(x => x.deleted))
    } else {
      return of(null)
    }
  };

}
