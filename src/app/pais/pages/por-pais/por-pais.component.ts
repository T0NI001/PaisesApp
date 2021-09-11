import { Component} from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class PorPaisComponent{

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];

  mostrarSugerencias: boolean = false;

  constructor( private PaisService: PaisService) { }

  buscar(termino: string){

    this.mostrarSugerencias = false;

    if (termino === "") {
      this.hayError = false;
      this.paises = [];
      this.paisesSugeridos = [];
      return;
    }

    this.hayError = false;
    this.termino=termino;
    this.paises = [];
    this.paisesSugeridos = [];

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
    this.mostrarSugerencias = true;
    this.termino = termino;
    //TODO: Crear sugerencias
    //this.buscar(termino);

    this.PaisService.buscarPais( termino )
      .subscribe( paises => {
        this.paisesSugeridos = paises.splice(0,3);
      
      }, (err) => {
          this.hayError = true;
          this.paisesSugeridos = [];
    
        });
  }

}
