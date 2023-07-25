import { Component} from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
    button {
      margin-right : 5px;
      margin: 2px
    }
    `
  ]
})
export class PorRegionComponent{

  termino : string  = "";
  hayError: boolean = false;
  paises  : Country[] = []; 
  regiones  : string[] = ['EFTA', 'EU', 'CARICOM', 'PA' ,'AU' , 'USAN', 'EEU', 'AL', 'ASEAN' , 'CAIS', 'CEFTA' , 'NAFTA', 'SAARC']; 
  regionActiva : string = '';

  constructor( private paisService : PaisService) { }

  getClassCSS( region : string) :string {
    return (region === this.regionActiva) ? 'btn btn-primary' : 'btn btn-outline-primary' 
  }

  activarRegion ( region : string){
    this.regionActiva = region;
  }

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
    this.paisService.buscarRegion(this.termino)
      .subscribe( 
      (paises) => {
        console.log(paises);
        this.paises = paises;

        },
      (err) => {
        this.hayError = true;
        this.paises = [];
        console.log('Error');
        console.info(err);
      });
  }

  sugerencias(termino :string){
    this.hayError =false;
    //TODO: crear sugerencias
    
  }

}
