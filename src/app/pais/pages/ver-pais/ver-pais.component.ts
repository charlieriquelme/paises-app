import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap, tap } from 'rxjs/operators';
import { PaisService } from '../../services/pais.service';
import { Country} from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  // reafirmamos que a typescript que nosotros sabemos que pais es una variable tipo country y es null, con el caracter !
  pais: Country[] = [];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService      
    ) { }

  ngOnInit(): void {
    // vamos a capturar los datos entregados por url con activeRoute
    // al crear el objeto activatedRoute nos permite suscribirnos a la url y capturar los datos
    
    this.activatedRoute.params
      .pipe(
        // dentro de este pipe definimos que controladores vamos a trabajar en el siguiente suscribe (también nos sirve para dejar más ordenado el codigo)
        // con el siguiente operador RXJS switchmap, cone el cual trabajaremos solo con le observable que nos entrega la función getPaisAlpha y no con todos los datos que si trabaja la primera funcion comentada
        switchMap( ({id}) => this.paisService.getPaisPorAlpha(id)) 
        ,// el operador tap nos imprime el obserfvable que nosoros enviamos a la siguiente funcion  ;)
        tap(console.log)
      )
      .subscribe(pais => {
        // trabajamos con el observable de getPaisPorAlpha
        this.pais = pais;
      });

    // para el siguiente trozo de codigo vamos a desestructrurar la variable param en id 
    // this.activatedRoute.params
    //   .subscribe( ({id}) => {
    //     // console.log(id);
    //     this.paisService.getPaisPorAlpha(id)
    //       .subscribe(pais => {
    //         // console.log(pais);
    //         this.pais = pais
    //       });
    
    //   })
  }

}
