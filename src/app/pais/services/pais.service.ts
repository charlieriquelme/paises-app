import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';

import { Country } from '../interfaces/pais.interface';

import { Observable} from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl : string = 'https://restcountries.com/v3.1';
  private apiUrlV2 : string = 'https://restcountries.com/';

  get httpParams (){
    return new HttpParams().set('fields', 'name,capital,cca2,flags,population' );
  }


  constructor( private http: HttpClient) { }

  // trabaja en base al rxjs el modulo http
  // el observable es de tipo generico, por ahora se maneja en any; pero es de buena practica hacer un tipado de la respuesta dada por http
  buscarPais( termino:string ) : Observable <Country[]>{
  
    const url = `${this.apiUrl}/name/${termino}`;
    return this.http.get<Country[]>(url, {params : this.httpParams});
    //   .pipe(
    //     // dentro de este apartado vamos a configurar los controladores rxjs ;)
    //     // la función of() nos permite transformar los observable en loq ue nosotros deseemos 
    //     catchError(err => of([]))
    // );

  }

  buscarCapital( termino:string ) : Observable <Country[]>{
  
    const url = `${this.apiUrl}/capital/${termino}`;
    return this.http.get<Country[]>(url, {params : this.httpParams});
  }

  buscarRegion( region:string ) : Observable <Country[]>{

    const url = `${this.apiUrlV2}v2/regionalbloc/${region}`;
    return this.http.get<Country[]>(url, {params : this.httpParams})
                    .pipe(
                      tap(console.log)
                    );
  }

  getPaisPorAlpha( id:string ) : Observable <Country[]>{

    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country[]>(url);
  }


}
