import { Component} from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent{

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor( private PaisService: PaisService) { }

  buscar(termino: string){

    if (termino === "") {
      this.hayError = false;
      this.paises = [];
      return;
    }

    this.hayError = false;
    this.termino=termino;

    this.PaisService.buscarPais( this.termino )
    .subscribe( (paises) => {
      this.paises=paises;


    }, (err) => {
      this.hayError = true;
      this.paises = [];

    });
  }

  sugerencias( termino: string){
    this.hayError = false;
    //TODO: Crear sugerencias
    this.buscar(termino);
  }

}
