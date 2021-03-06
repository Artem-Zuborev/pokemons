import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(pokemons: any[], name: string = ''): any[] {
    if (!name.trim()) {
      return pokemons;
    }
    return pokemons.filter( item => {
      return item.name.toLowerCase().includes(name);
    });
  }

}
