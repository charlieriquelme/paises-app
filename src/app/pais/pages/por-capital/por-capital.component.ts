import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent{

  termino : string  = "";
  hayError: boolean = false;
  paises  : Country[] = []; 

  constructor( private paisService : PaisService) { }

  buscar(termino: string){
    this.hayError = false;
    this.termino  = termino;
    console.log(this.termino);
    
    // el formato del suscribe esta basado en la antigua expresión 
    /*
      actualmente se ocupa de esta manera
      vowels$.subscribe({  
              resp: x => console.log(resp),  
              error: err => console.error('An error occurred', err)
            });
    */
    this.paisService.buscarCapital(this.termino)
      .subscribe( 
      (paises) => {
        this.paises = paises;
        },
      (err) => {
        this.hayError = true;
        this.paises = [];
        console.log('Error');
        console.info(err);
      });
  }

}
