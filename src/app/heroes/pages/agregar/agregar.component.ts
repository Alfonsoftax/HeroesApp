import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width:100%;
      border-radius:5px;
    }
  `
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
  constructor(private heroesService:HeroesService,
              private activatedRoute:ActivatedRoute,
              private router:Router,
              private snackBar:MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    if(this.router.url.includes('editar')){
      this.activatedRoute.params
      .pipe(
        switchMap(({id})=>this.heroesService.getHeroePorId(id))
      )
      .subscribe( heroe=>this.heroe=heroe);
    }

    
  }

  guardar(){
    if(this.heroe.superhero.trim().length!==0){
      if(this.heroe.id){
        this.heroesService.actualizarHeroe(this.heroe)
        .subscribe(heroe=>this.mostrarSnackBar('Registro actualizado'));
      }else{
        this.heroesService.agregarHeroe(this.heroe)
        .subscribe(heroe=>{
            this.router.navigate(['/heroes/editar',heroe.id]);
            this.mostrarSnackBar('Registro creado');
        });

      }        
    }
  }

  borrar(){

    const dialog=this.dialog.open(ConfirmarComponent,{
      width:'250px',
      data: this.heroe
    });

    dialog.afterClosed().subscribe(
      (result)=>{
        if(result){
          this.heroesService.borrarHeroe(this.heroe.id!)
          .subscribe(resp=>{
              this.router.navigate(['/heroes']);
          });
        }
      }
    )

    
  }

  mostrarSnackBar(mensaje:string){
    this.snackBar.open(mensaje, 'ok!',{
        duration:2500
    });
  }

}
