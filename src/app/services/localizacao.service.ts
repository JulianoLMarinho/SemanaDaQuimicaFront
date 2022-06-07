import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado, Municipio } from '../shared/models/localizacao';

@Injectable({
  providedIn: 'root',
})
export class LocalizacaoService {
  constructor(private http: HttpClient) {}

  getUFs() : Observable<Estado[]> {
    return this.http.get<Estado[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
  }

  getMunicipios(uf: string) : Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
  }
}
