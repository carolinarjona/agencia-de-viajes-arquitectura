import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'src/app/shared/confirmation-modal/confirmation.service';
import { IdValor } from '../../models/id-valor';
import { Viaje } from '../models/viaje';
import { ViajesFilter } from '../models/viajes-filter';
import { ViajesModelService } from '../services/viajes-model.service';

@Component({
  selector: 'app-viajes-list',
  templateUrl: './viajes-list.component.html',
  styleUrls: ['./viajes-list.component.scss']
})
export class ViajesListComponent implements OnInit {

  mostrarTarjetas = false;
  viajes: Viaje[] = [];
  tiposDeViaje: IdValor[] = [];

  filtro: ViajesFilter | null = null;


  constructor(private viajesModel: ViajesModelService, private router: Router,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.viajesModel.getViajes().subscribe(x => {
      this.viajes = x;
    });
    this.tiposDeViaje = this.viajesModel.getTiposDeViajes();
  };

  cambiarVistaClick(): void {
    this.mostrarTarjetas = !this.mostrarTarjetas;
  };

  searchClick(filtro: ViajesFilter) {
    if (filtro) {
      this.filtro = filtro;
      this.viajesModel.buscar(filtro).subscribe(result => {
        this.viajes = result;
      })
    }
  };

  borrarClick(id: string): void {
    if (id) {
      this.confirmationService.confirmar(
        {
          titulo: 'Eliminar viaje',
          pregunta: '¿Está seguro de querer eliminar este viaje?',
          opcionSi: 'Sí, eliminar',
          opcionNo: 'Cancelar'
        }
      ).subscribe(x => {
        if (x) {
          this.viajesModel.borrarViaje(id).subscribe(() => {
            this.viajesModel.getViajes().subscribe(result => {
              this.viajes = result;
            })
          })
        }
      })
    };
  };

  editarClick(id: string): void {
    if (id) {
      this.router.navigate(['viajes/editar', id]);
    }
  };

  // paging(event: GridEvent): void {
  //   if (this.filtro) {
  //   this.viajesModel.buscar(this.filtro, event).subscribe(result => {

  //   })
  // }
  // }

}
