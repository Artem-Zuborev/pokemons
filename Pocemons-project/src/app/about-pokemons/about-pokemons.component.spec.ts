import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPokemonsComponent } from './about-pokemons.component';

describe('AboutPokemonsComponent', () => {
  let component: AboutPokemonsComponent;
  let fixture: ComponentFixture<AboutPokemonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutPokemonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
