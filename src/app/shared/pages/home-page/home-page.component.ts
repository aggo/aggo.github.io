import {Component, OnInit} from '@angular/core';
import {AppConfig} from '../../../configs/app.config';
import {UtilsHelperService} from '../../../core/services/utils-helper.service';
import { TILEntry } from '../../../modules/entries/shared/entry.model';
import { EntriesService } from '../../../modules/entries/shared/entries.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [UtilsHelperService.fadeInOut()]
})

export class HomePageComponent implements OnInit {
  entries: TILEntry[] = null;

  constructor(private heroService: EntriesService) {
  }

  ngOnInit() {
    this.heroService.getHeroes().subscribe((heroes: Array<TILEntry>) => {
      this.entries = heroes.slice(0, AppConfig.topHeroesLimit);
    });
  }
}
