export class Usuario {
    id: string;
    nombre: string;
    email: string;
    rol: string;
    token: string;
    expires_in: number;
    refresh_token: string;

    constructor(item?:any) {
        this.id = item?.id ?? '';
        this.nombre = item?.nombre ?? '';
        this.email = item?.email ?? '';
        this.rol = item?.rol ?? '';
        this.token = item?.token ?? '';
        this.expires_in = item?.expires_in ?? 0;
        this.refresh_token = item?.refresh_token ?? '';
    }
}