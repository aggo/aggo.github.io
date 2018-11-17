import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TestsModule} from '../../modules/tests.module';
import {EntriesService} from '../../../modules/entries/shared/hero.service';
import {HomePageComponent} from './home-page.component';
import {APP_CONFIG, AppConfig} from '../../../configs/app.config';
import {of} from 'rxjs';
import {TILEntry} from '../../../modules/entries/shared/hero.model';

describe('HomePage', () => {
  let fixture;
  let component;
  let heroService;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [
        HomePageComponent
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        EntriesService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.debugElement.componentInstance;
    heroService = TestBed.get(EntriesService);
  }));

  it('should create hero top component', (() => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('should initialice component', fakeAsync(() => {
    const heroes = [
      new TILEntry({name: 'test1', default: true}),
      new TILEntry({name: 'test2', default: true}),
      new TILEntry({name: 'test3', default: true}),
      new TILEntry({name: 'test4', default: true})
    ];
    spyOn(heroService, 'getHeroes').and.returnValue(of(heroes));
    fixture.detectChanges();
    tick();
    expect(component.entries.length).toBe(AppConfig.topHeroesLimit);
  }));
});
