import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroCardComponent} from './hero-card.component';
import {EntriesService} from '../../../modules/entries/shared/hero.service';
import {APP_CONFIG, AppConfig} from '../../../configs/app.config';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {TestsModule} from '../../modules/tests.module';
import {TILEntry} from '../../../modules/entries/shared/hero.model';
import {TranslateModule} from '@ngx-translate/core';

describe('HeroCardComponent', () => {
  let component: HeroCardComponent;
  let fixture: ComponentFixture<HeroCardComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        HeroCardComponent
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        EntriesService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should like a hero', () => {
    localStorage.setItem('votes', String(AppConfig.votesLimit - 1));
    const hero = new TILEntry({likes: 1});
    hero.like();
    expect(hero.likes).toBe(2);
  });

  it('should not like a hero', () => {
    localStorage.setItem('votes', String(AppConfig.votesLimit));
    expect(EntriesService.checkIfUserCanVote()).toBe(false);
  });
});
