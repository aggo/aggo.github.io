import {async, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {HeroesModule} from '../../heroes.module';
import {TestsModule} from '../../../../shared/modules/tests.module';
import {TranslateModule} from '@ngx-translate/core';
import {EntriesService} from '../../shared/hero.service';
import {APP_CONFIG, AppConfig} from '../../../../configs/app.config';
import {EntriesListPageComponent} from './heroes-list-page.component';

describe('HeroListComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
        HeroesModule
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        EntriesService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EntriesListPageComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
  }));

  it('should create hero list component', (() => {
    expect(component).toBeTruthy();
  }));
});
