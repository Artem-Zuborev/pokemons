import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Pokemon {

  constructor(
    private http: HttpClient
  ) {
  }

  getApi(limit?: number, offset?: number): any{
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  }
}

