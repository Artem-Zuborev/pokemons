import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PokemonsListComponent} from './pokemons-list/pokemons-list.component';
import {AboutPokemonsComponent} from './about-pokemons/about-pokemons.component';
import {MyPokemonsComponent} from './my-pokemons/my-pokemons.component';
import {PokemonInfoComponent} from './pokemon-info/pokemon-info.component';
import {GameComponent} from './game/game.component';

const routes: Routes = [
  {path: '', component: GameComponent},
  {path: 'about-pokemons', component: AboutPokemonsComponent},
  {path: 'pokemons-list', component: PokemonsListComponent},
  {path: 'my-pokemons', component: MyPokemonsComponent},
  {path: 'game', component: GameComponent},
  {path: 'pokemon-info/:id', component: PokemonInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
