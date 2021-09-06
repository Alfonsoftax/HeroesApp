import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroes.interfaces';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes():Observable<Heroe[]>{
   return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);
  }

  getHeroePorId(id:String):Observable<Heroe>{
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`);
   }

   getSugerencias(termino:String):Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=6`);
   }


}

