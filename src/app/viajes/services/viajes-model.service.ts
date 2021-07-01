import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Viaje } from '../models/viaje';
import { IdValor } from '../../models/id-valor';
import { delay, map } from 'rxjs/operators';
import { ViajeDelete } from '../models/viajeDelete';
import { ViajesFilter } from '../models/viajes-filter';
import { AuthService } from 'src/app/core/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ViajesModelService {

  private tiposDeViaje: IdValor[] = [
    { id: 1, valor: 'Familiar' },
    { id: 2, valor: 'Trabajo' },
    { id: 3, valor: 'LunaDeMiel' },
    { id: 4, valor: 'AhoraMismoPorFavor' },
    { id: 5, valor: 'Aventura' },
    { id: 6, valor: 'Cultural' },
    { id: 7, valor: 'Deluxury' },
    { id: 8, valor: 'Gastronómico' },
  ];

  private url = 'http://localhost:3000'
  
  constructor(private http: HttpClient, private authService: AuthService) { }

  getViajes(): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(`${this.url}/viajes`).pipe(
      map(x => x.map(v => new Viaje(v)))
    )
  };

  getViajeById(id: string): Observable<Viaje> {
    return this.http.get<Viaje>(`${this.url}/viajes/${id}`).pipe(
      map(x => new Viaje(x))
    )
  };

  guardar(viaje: Viaje): Observable<Viaje | null> {
    if (!viaje) {
      return of(null);
    }
    if (viaje.id) {
      return this.http.put<Viaje>(`${this.url}/viajes/${viaje.id}`, viaje).pipe(
        map(x => new Viaje(x))
      )
    }
    return this.http.post<Viaje>(`${this.url}/viajes/`, viaje).pipe(
      map(x => new Viaje(x))
    )
  };

  borrarViaje(id: string): Observable<Boolean | null> {
    if (id) {
      return this.http.delete<ViajeDelete>(`${this.url}/viajes/${id}`).pipe(map(x => x.deleted))
    } else {
      return of(null);
    }
  };

  getTiposDeViajes(): IdValor[] {
    return this.tiposDeViaje;
  };

  buscar(filtro: ViajesFilter): Observable<Viaje[] | []> {
    const {nombre, destino, tipoDeViajeId} = filtro;

    let params = '';
    if (filtro?.tipoDeViajeId) {
      params = `tipoDeViajeId=${tipoDeViajeId}`
    }
    if (filtro?.nombre) {
      params = params ? `${params}&nombre=${nombre}` : `nombre=${nombre}`;
    }
    if (filtro?.destino) {
      params = params ? `${params}&destino=${destino}` : `destino=${destino}`;
    }

    return this.http.get<Viaje[] | []>(`${this.url}/search?${params}`)
      .pipe(map((x) => x.map((v: Viaje) => new Viaje(v))));
  };

  filtrar(filtro: any): Observable<any> {
    const { tipoDeViajeId, nombre, destino } = filtro;
    return this.http
      .get<Viaje[] | null>(
        `${this.url}/viajes/search?tipoDeViajeId=${tipoDeViajeId}&nombre=${nombre}&destino=${destino}`)
      .pipe(map((v) => new Viaje(v)));
  };
}
