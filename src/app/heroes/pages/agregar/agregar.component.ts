import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

  heroe: Heroe={
    superhero:"",
    alter_ego:"",
    publisher:Publisher.realBetis,
    first_appearance:'',
    alt_img:'',
    characters:'',
    id:''

  }
  publisher= [
    {
      id:"realBetis",
      desc: "Real - Betis"
    },
    {
      id:"out",
      desc: "Otro - equipo"
    }
  ]
  constructor(private heroesService:HeroesService) { }

  ngOnInit(): void {
  }

  guardar(){
    if(this.heroe.superhero.trim().length!==0){
        this.heroesService.agregarHeroe(this.heroe)
        .subscribe(resp=>{
            console.log('Respuesta',resp);
        });
    }
  }

}
