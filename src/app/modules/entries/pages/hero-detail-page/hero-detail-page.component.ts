import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {AppConfig} from '../../../../configs/app.config';
import {UtilsHelperService} from '../../../../core/services/utils-helper.service';
import { TILEntry } from '../../shared/entry.model';
import { EntriesService } from '../../shared/entries.service';

@Component({
  selector: 'app-hero-detail-page',
  templateUrl: './hero-detail-page.component.html',
  styleUrls: ['./hero-detail-page.component.scss'],
  animations: [UtilsHelperService.fadeInOut()]
})

export class HeroDetailPageComponent implements OnInit {

  hero: TILEntry;
  canVote: boolean;

  constructor(private heroService: EntriesService,
              private location: Location,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const heroId = this.activatedRoute.snapshot.paramMap.get('id');
    this.heroService.getHero(heroId).subscribe((hero: TILEntry) => {
      this.hero = hero;
    });
  }

  dynamicImport() {
    import('html2canvas').then((html2canvas: any) => {
      html2canvas.default(document.getElementById('heroe-detail')).then((canvas) => {
        window.open().document.write('<img src="' + canvas.toDataURL() + '" />');
      });
    });
  }

  goBack(): void {
    this.location.back();
  }

  goToTheAnchor(): void {
    this.router.navigate([`/${AppConfig.routes.entries}/${this.hero.id}`], {fragment: 'heroe-detail'});
  }
}
