import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Viaje } from '../../models/viaje';


@Component({
  selector: 'app-viajes-card-list',
  templateUrl: './viajes-card-list.component.html',
  styleUrls: ['./viajes-card-list.component.scss']
})
export class ViajesCardListComponent implements OnInit, OnChanges {

  @Input() viajes: Viaje[] = [];
  viajesCard: Viaje[] = [];
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.viajes){
      // this.viajes = [{
      //   id: '8',
      //   nombre: '💲 ¡Súper trabajo! 💲',
      //   tipoDeViajeId: TipoDeViaje.Trabajo,
      //   duracion: 2,
      //   destino: 'Málaga Valley',
      //   plazas: 4,
      //   enOferta: true,
      //   estado: 1,
      //   fechaSalida: new Date(2021, 8, 1)
      // }, ...this.viajes]
      // this.viajesCard = [...changes.viajes.currentValue];
    
      // this.viajesCard.push({
      //   id: '8',
      //   nombre: '💲 ¡Súper trabajo! 💲',
      //   tipoDeViajeId: TipoDeViaje.Trabajo,
      //   duracion: 2,
      //   destino: 'Málaga Valley',
      //   plazas: 4,
      //   enOferta: true,
      //   estado: 1
      // })
  
      // this.viajes = this.viajesCard;
    }
  }

  ngOnInit(): void {
    
  }

}
