export class EstadoCivil {
    id: number;
    estadoCivilDesc: string;
  
    constructor(item?: any) {
      this.id = item?.id ?? 0;
      this.estadoCivilDesc = item?.estadoCivilDesc ?? '';
    }
  }