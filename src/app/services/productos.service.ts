import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  producto: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise ( ( resolve, reject ) => {
      this.http.get('https://angular-html-c8df9.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[]) => {
        console.log(resp);
        this.cargando = false;
        this.producto = resp;
        resolve();
      });

    });
  }

  getProducto( id: string) {
    return this.http.get(`https://angular-html-c8df9.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto ( termino: string) {

    if (this.producto.length === 0) {

      this.cargarProductos().then( () => {

        this.filtrarProductos(termino);

      });
    } else {

        this.filtrarProductos(termino);

    }
  }

  private filtrarProductos( termino: string ) {

    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();

    this.producto.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0) {

        this.productosFiltrado.push( prod );

      }
    });
  }
}


