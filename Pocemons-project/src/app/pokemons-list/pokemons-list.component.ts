import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pokemon} from '../pokemon.service';
import {Subscription} from 'rxjs';
import {delay, map, mergeMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss']
})
export class PokemonsListComponent implements OnInit, OnDestroy {
  pokemons: any[] = [];
  page = 1;
  totalPokemons = 648;
  subscription: Subscription;
  name = '';
  offset: number;
  limitItemOnPage = 12;
  loading = false;

  constructor(
    private pokemonService: Pokemon,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.getPokemons();

  }

  getPokemons(): void {
    this.loading = true;
    this.offset = (this.page * this.limitItemOnPage) - this.limitItemOnPage;
    this.subscription = this.pokemonService.getApi(this.limitItemOnPage, this.offset)
      .pipe(delay(1500))
      .subscribe((response: any) => {
        response.results.forEach(result => {
          this.http.get(result.url)
            .subscribe((uniqResponse: any) => {
              this.pokemons = [...this.pokemons, uniqResponse];
              this.pokemons.sort((a, b) => a.id > b.id ? 1 : -1);
            });
        });
        this.loading = false;
      });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
