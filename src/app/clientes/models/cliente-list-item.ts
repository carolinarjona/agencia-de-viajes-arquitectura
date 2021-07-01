
export class ClienteListItem {
    id: string;
    nombre: string;
    apellidos: string;
    dni: string;
    telefono: string;
    estadoCivilDesc: string;


    constructor(item?: any) {
        this.id = item?.id ?? '';
        this.nombre = item?.nombre ?? '';
        this.apellidos = item?.apellidos ?? '';
        this.dni = item?.dni ?? '';
        this.telefono = item?.telefono ?? '';
        this.estadoCivilDesc = item?.estadoCivilDesc ?? '';
    }
}