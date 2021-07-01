import { Pipe, PipeTransform } from '@angular/core';
import { TipoDeViaje } from './models/enums/tipo-de-viaje-enum';
import { ViajesModelService } from './services/viajes-model.service';


@Pipe({
  name: 'tipoDeViaje'
})
export class TipoDeViajePipe implements PipeTransform {

  constructor(private viajesModelService: ViajesModelService) { }

  transform(tipoDeViajeId: number | null): unknown {

    switch (tipoDeViajeId) {
      case TipoDeViaje.Familiar:
        return "Familiar";
      case TipoDeViaje.Trabajo:
        return "Trabajo";
      case TipoDeViaje.LunaDeMiel:
        return "Luna de miel";
      case TipoDeViaje.AhoraMismoPorFavor:
        return "Ahora mismo, por favor";
      case TipoDeViaje.Aventura:
        return "Aventura";
      case TipoDeViaje.Cultural:
        return "Cultural";
      case TipoDeViaje.Deluxury:
        return "Deluxury"
      case TipoDeViaje.Gastronomico:
        return "Gastronómico";
      default:
        return "Por definir"
    }
  }

  // transform2(id: number): unknown {
  //   const tipo = this.viajesModelService.getTiposDeViajes();
  //   const v = tipo.find((x) => x.id === id)?.valor;

  //   return v ? v : ' - - - ';
  // }

}
