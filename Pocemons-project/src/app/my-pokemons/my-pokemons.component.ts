import {Component, OnInit} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {Pokemon} from '../pokemon.service';


@Component({
  selector: 'app-my-pokemons',
  templateUrl: './my-pokemons.component.html',
  styleUrls: ['./my-pokemons.component.scss']
})
export class MyPokemonsComponent implements OnInit {
  subscription: Subscription;
  pokemonsDetail;
  newItem;
  imgPok;
  images;
  arrayOfPokemons = [];
  namePok;
  myPokemons;
  i;
  private abilities: any;
  private experience: any;
  private idPok: any;
  typePokemon;

  constructor(private config: NgbCarouselConfig,
              private http: HttpClient,
              private pokemonService: Pokemon) {
    config.showNavigationArrows = true;
    config.wrap = true;
    config.animation = true;
  }


  ngOnInit(): void {
    this.subscription = this.pokemonService.getApi(648)
      .subscribe((response: any) => {
        this.pokemonsDetail = response;
        this.pokemonsDetail.results.forEach(result => {
          this.http.get(result.url)
            .subscribe(item => {
              this.newItem = item;
              this.myPokemons = JSON.parse(localStorage.getItem('myPokemons'));
              console.log(this.myPokemons);
              // tslint:disable-next-line:prefer-for-of
              for (let i = 0; i < this.myPokemons.length; i++) {
                if (this.newItem.name === this.myPokemons[i]) {
                  this.typePokemon = this.newItem.types[0].type.name;
                  this.abilities = this.newItem.abilities;
                  this.experience = this.newItem.base_experience;
                  this.namePok = this.newItem.name;
                  this.idPok = this.newItem.id;
                  this.imgPok = this.newItem.sprites.other.dream_world.front_default;
                  this.arrayOfPokemons.push(
                    {
                      name: this.namePok,
                      id: (this.idPok),
                      photo: this.imgPok,
                      type: this.typePokemon,
                      abilities: this.abilities,
                      experience: this.experience
                    }
                  );
                }
              }
            });
        });
      });
  }
}



