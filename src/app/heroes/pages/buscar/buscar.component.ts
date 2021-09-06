import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string| any='';
  heroes:Heroe[]=[];
  constructor(private heroesService:HeroesService) { }
  heroeSeleccionado:Heroe | undefined;
  ngOnInit(): void {
  }

  buscando(){
      this.heroesService.getSugerencias(this.termino.trim())
      .subscribe(heroes=>this.heroes=heroes);
  }

  opcionSeleccionada(event:MatAutocompleteSelectedEvent){

    if(event.option.value){
    const heroe:Heroe= event.option.value;
    this.termino=heroe.superhero;

    this.heroesService.getHeroePorId(heroe.id)
    .subscribe(heroe=>this.heroeSeleccionado=heroe);
    }else{
      this.heroeSeleccionado=undefined;
    }

   }

}
