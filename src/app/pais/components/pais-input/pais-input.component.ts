import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime} from 'rxjs/operators'

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit {
  
  // cuando declaramos un evento este siempre tiene que tener definido que tipo de respuesta tendra que enviar
  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  // output para mostrar el resultado de la busqueda sin la necesidad que el usuario aprete el enter 
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  // para recibir string o datos desde una página u/o función ocupamos para esas ocasionces el input
  @Input() placeholder: string = '';

  debouncer: Subject <string> = new Subject();

  termino: string = '';

  ngOnInit() {
    this.debouncer
    .pipe(
      // el pipe sirve para conectar a otras funciones
      // el debounceTime nos permite definier el margen de tiempo(ms) que tendrá cada salida de datos
      debounceTime(100)
    )
    .subscribe( valor=> {
      this.onDebounce.emit(valor);
      // console.log('debouncer ', valor);
    } )
  }

  buscar(){
    this.onEnter.emit(this.termino);
  }

  teclaPresionada(){
    // de esta forma conectamos el dato que podemos escribir en el input con el debounce que se ejecuta dado el oninit
    this.debouncer.next(this.termino);
    // console.log(this.termino);
  }


}
