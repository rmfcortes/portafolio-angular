import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interfaces';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  cargadaEquipo = true;
  equipo: any[] = [];

  constructor( private http: HttpClient) {
    console.log('Servicio de Pagina Listo');
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    /*Leer archivo JSON */
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp: InfoPagina) => {
      this.cargada = true;
      this.info = resp;
      console.log(resp);
      console.log( resp['email'] );
    });
  }

  private cargarEquipo() {
    this.http.get('https://angular-html-c8df9.firebaseio.com/equipo.json')
    .subscribe( (resp: any[]) => {
      this.cargadaEquipo = true;
      this.equipo = resp;
    });
  }

}
