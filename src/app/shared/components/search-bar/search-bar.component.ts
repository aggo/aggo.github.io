import {map, startWith} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {LoggerService} from '../../../core/services/logger.service';
import {AppConfig} from '../../../configs/app.config';
import { TILEntry } from '../../../modules/entries/shared/entry.model';
import { EntriesService } from '../../../modules/entries/shared/entries.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  providers: [
    LoggerService
  ]
})

export class SearchBarComponent implements OnInit {

  defaultHeroes: Array<TILEntry>;
  heroFormControl: FormControl;
  filteredHeroes: any;

  constructor(private heroService: EntriesService,
              private router: Router) {
    this.defaultHeroes = [];
    this.heroFormControl = new FormControl();
  }

  ngOnInit() {
    this.heroService.getHeroes().subscribe((heroes: Array<TILEntry>) => {
      this.defaultHeroes = heroes.filter(hero => hero['default']);

      this.heroFormControl.valueChanges.pipe(
        startWith(null),
        map(value => this.filterHeroes(value)))
        .subscribe(heroesFiltered => {
          this.filteredHeroes = heroesFiltered;
        });
    });
  }

  filterHeroes(val: string): TILEntry[] {
    return val ? this.defaultHeroes.filter(hero => hero.content.toLowerCase().indexOf(val.toLowerCase()) === 0 && hero['default'])
      : this.defaultHeroes;
  }

  searchHero(hero: TILEntry): Promise<boolean> {
    LoggerService.log('Moved to hero with id: ' + hero.id);
    return this.router.navigate([AppConfig.routes.entries + '/' + hero.id]);
  }
}
