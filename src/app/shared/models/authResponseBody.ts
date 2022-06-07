import { Usuario } from "./usuario";

export interface AuthResponseBody {
    usuario?: Usuario;
    responseType: ResponseTypes;
    access_token: string;
}

export type ResponseTypes = 'OK' | 'USUARIO_NAO_EXISTE' | 'GOOGLE_NAO_ASSOCIADO' | 'CONFLITO_GOOGLE';
