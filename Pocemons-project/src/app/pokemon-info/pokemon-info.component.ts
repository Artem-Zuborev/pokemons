import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pokemon} from '../pokemon.service';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.scss']
})
export class PokemonInfoComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  namePok;
  idPok;
  imgPok;
  pokemonsDetail;
  pokemon;
  newItem;
  arrayOfPokemons = [];
  typePokemon;
  abilities;
  experience;
  myPoke;
  height;
  health;
  attackPower;
  type;
  count = 0;

  constructor(private pokemonService: Pokemon,
              private http: HttpClient,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.pokemonService.getApi(648)
      .subscribe((response: any) => {
        this.pokemonsDetail = response;
        this.pokemonsDetail.results.forEach(result => {
          console.log(result);
          this.http.get(result.url)
            .subscribe(item => {
              this.newItem = item;
              this.typePokemon = this.newItem.types[0].type.name;
              this.abilities = this.newItem.abilities;
              this.experience = this.newItem.base_experience;
              this.namePok = this.newItem.name;
              this.idPok = this.newItem.id;
              this.imgPok = this.newItem.sprites.other.dream_world.front_default;
              this.health = this.newItem.height;
              this.arrayOfPokemons.push(
                {
                  name: `${this.namePok}`,
                  id: (this.idPok),
                  photo: this.imgPok,
                  type: this.typePokemon,
                  abilities: this.abilities,
                  experience: this.experience,
                  health: this.health
                }
              );
              this.arrayOfPokemons.sort((a, b) => a.id > b.id ? 1 : -1);
              this.route.paramMap.subscribe(params => {
                this.pokemon = this.arrayOfPokemons[+params.get('id') - 1];
              });
            });
        });

      });
  }

  ngOnDestroy(): void {
     this.subscription.unsubscribe();
  }
}
