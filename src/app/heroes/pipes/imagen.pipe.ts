import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interfaces';

@Pipe({
  name: 'imagen',
  pure:false //para que se procese varias veces la imagen y no haya que volverla a arreglar(consume muchos recursos)
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): unknown {
    if(!heroe.id&&!heroe.alt_img){
      return 'assets/no-image.png'
    }else if(heroe.alt_img){
      return heroe.alt_img;
    }else{
      return `assets/heroes/${heroe.id}.jpg`;
    }
    
  }
}
