import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPreloaderComponent } from './card-preloader.component';

describe('CardPreloaderComponent', () => {
  let component: CardPreloaderComponent;
  let fixture: ComponentFixture<CardPreloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPreloaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPreloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
