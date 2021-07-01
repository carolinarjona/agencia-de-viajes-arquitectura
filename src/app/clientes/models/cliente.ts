import { EstadoCivilTipo } from './enums/estado-civil-enum';

export class Cliente {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  direccion: string;
  dni: string;
  telefono: string | null;
  fechaDeNacimiento: Date | null;
  estadoCivilId: EstadoCivilTipo | null;

  constructor(item?: any) {
    this.id = item?.id ?? '';
    this.dni = item?.dni ?? '';
    this.nombre = item?.nombre ?? '';
    this.apellidos = item?.apellidos ?? '';
    this.email = item?.email ?? '';
    this.telefono = item?.telefono ?? null;
    this.direccion = item?.direccion ?? null;
    this.estadoCivilId = item?.estadoCivilId ? item?.estadoCivilId : null;
    this.fechaDeNacimiento = item?.fechaDeNacimiento
      ? new Date(item.fechaDeNacimiento)
      : null;
  }
}
