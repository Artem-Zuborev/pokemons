import {
  Component,
  ViewChild,
  ElementRef,
  OnInit, ViewChildren, QueryList, OnDestroy
} from '@angular/core';
import {Pokemon} from '../pokemon.service';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {interval} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [
    trigger('rotate', [
      state('start', style({transform: 'rotate(0deg)'})),
      state('end', style({transform: 'rotate(360deg)'})),
      transition('start => end', animate(10000))
    ])
  ]
})
export class GameComponent implements OnInit {
  @ViewChild('time', {static: true}) time: ElementRef;
  @ViewChild('cardsFirst', {static: true}) cardsBlockOne: ElementRef;
  @ViewChild('cardsSecond', {static: true}) cardsBlockTwo: ElementRef;
  @ViewChild('cardsThird', {static: true}) cardsBlockThree: ElementRef;
  @ViewChildren('cardItemOne', {read: ElementRef}) cardItemOne: QueryList<ElementRef>;
  @ViewChildren('cardItemTwo', {read: ElementRef}) cardItemTwo: QueryList<ElementRef>;
  @ViewChildren('cardItemThree', {read: ElementRef}) cardItemThree: QueryList<ElementRef>;
  cardsOne: any[] = ['нет', 0, 1, 2, 3, 4, 'нет', 5, 6, 'нет'];
  cardsTwo: any[] = ['нет', 0, 1, 'нет', 2, 'нет', 3, 'нет', 4, 'нет'];
  cardsThree: any[] = ['нет', 0, 1, 2, 3, 'нет', 4, 5, 6, 7, 8];
  randomOne;
  randomTwo;
  randomThree;
  resultOne;
  resultTwo;
  resultThree;
  result1;
  subscription: Subscription;
  pokemonsDetail;
  newItemPoke;
  typePokemon;
  experience;
  abilities;
  namePok;
  imgPok;
  notPoke;
  nameMyPokemon;
  myPokemons = [];
  count = 0;
  disabled = true;
  todayTime = Date.now();
  active = false;
  rotateState = 'start';

  constructor(private pokemonService: Pokemon,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.showTime();
  }

  public start(): any {
    this.count++;
    this.randomOne = Math.floor(Math.random() * 9); // От 0 до 9
    this.randomTwo = Math.floor(Math.random() * 9); // От 0 до 9
    this.randomThree = Math.floor(Math.random() * 9); // От 0 до 9
    this.cardsBlockOne.nativeElement.style.left = -this.randomOne * 100 + 'px';
    this.cardsBlockTwo.nativeElement.style.left = -this.randomTwo * 100 + 'px';
    this.cardsBlockThree.nativeElement.style.left = -this.randomThree * 100 + 'px';
    this.randomOne++;
    this.randomTwo++;
    this.randomThree++;
    setTimeout(() => {
      this.cardItemOne.toArray()[this.randomOne].nativeElement.style.background = '#11998e';
      this.cardItemOne.toArray()[this.randomOne].nativeElement.style.color = 'white';
      this.cardItemTwo.toArray()[this.randomTwo].nativeElement.style.background = '#11998e';
      this.cardItemTwo.toArray()[this.randomTwo].nativeElement.style.color = 'white';
      this.cardItemThree.toArray()[this.randomThree].nativeElement.style.background = '#11998e';
      this.cardItemThree.toArray()[this.randomThree].nativeElement.style.color = 'white';
    }, 5000);
    this.resultOne = this.cardItemOne.toArray()[this.randomOne].nativeElement.innerText;
    this.resultTwo = this.cardItemTwo.toArray()[this.randomTwo].nativeElement.innerText;
    this.resultThree = this.cardItemThree.toArray()[this.randomThree].nativeElement.innerText;
    this.result1 = Number(String(this.resultOne) + String(this.resultTwo) + String(this.resultThree));
    setTimeout(() => {
      this.subscription = this.pokemonService.getApi(648)
        .subscribe((response: any) => {
          this.pokemonsDetail = response;
          const result = this.pokemonsDetail.results[this.result1];
          if (result === undefined) {
            this.notPoke = 'Lucky next time!';
            this.typePokemon = '';
            this.experience = '';
            this.namePok = '';
            this.imgPok = '';
            return;
          }
          this.http.get(result.url)
            .subscribe(item => {
              this.newItemPoke = item;
              this.namePok = this.newItemPoke.name;
              this.imgPok = this.newItemPoke.sprites.other.dream_world.front_default;
              if (isNaN(this.result1)) {
              } else if (!isNaN(this.result1)) {
                this.notPoke = '';
              }
            }, error => console.log(error));
          this.subscription.unsubscribe();
        });
    }, 5000);
  }

  public add(): void {
    this.nameMyPokemon = this.namePok;
    if (localStorage.getItem('myPokemons')) {
      this.myPokemons = JSON.parse(localStorage.getItem('myPokemons'));
    }
    this.myPokemons.push(this.nameMyPokemon);
    localStorage.setItem('myPokemons', JSON.stringify(this.myPokemons));

  }

  public showTime(): void {
    const source = interval(1000);
    const subscribe = source.subscribe(val => {
      this.todayTime = Date.now();
      const minutes = new Date().getMinutes();
      const hours = new Date().getHours();
      const seconds = new Date().getSeconds();
      this.disabled = !(hours === 10 && minutes === 0 || hours === 20 && minutes === 0);
      if (this.count === 3) {
        this.disabled = true;
      }
    });
  }

  public animateRotate(): void {
    this.rotateState = this.rotateState === 'start' ? 'end' : 'start';
  }

  public animateRotateStop(): void {
    this.rotateState = this.rotateState === 'start' ? 'start' : 'start';
  }
}

