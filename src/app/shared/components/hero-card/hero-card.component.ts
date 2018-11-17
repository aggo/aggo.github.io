import {Component, Input, OnInit} from '@angular/core';
import {AppConfig} from '../../../configs/app.config';
import {Router} from '@angular/router';
import { TILEntry } from '../../../modules/entries/shared/entry.model';
import { EntriesService } from '../../../modules/entries/shared/entries.service';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit {

  @Input() hero: TILEntry;

  canVote: boolean;

  constructor(private heroService: EntriesService,
              private router: Router) {
    this.canVote = EntriesService.checkIfUserCanVote();
  }

  ngOnInit() {
  }

  like(hero: TILEntry): Promise<void> {
    if (this.canVote) {
      hero.like();
      return this.heroService.updateHero(hero);
    }
  }

  seeHeroDetails(hero): void {
    if (hero.default) {
      this.router.navigate([AppConfig.routes.entries + '/' + hero.id]);
    }
  }

}
