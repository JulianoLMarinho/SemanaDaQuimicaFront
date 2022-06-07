export interface Estado {
    id:      number;
    sigla:   string;
    nome:    string;
    regiao?: Estado;
}

export interface Municipio {
    id: number;
    nome: string;
}
