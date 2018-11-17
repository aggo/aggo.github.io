import { Component, Inject, OnInit } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../../configs/app.config';
import { ProgressBarService } from '../../../core/services/progress-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {


  appConfig: any;
  menuItems: any[];
  progressBarMode: string;
  currentLang: string;

  constructor(@Inject(APP_CONFIG) appConfig: any,
              private progressBarService: ProgressBarService,) {
    this.appConfig = appConfig;
  }

  ngOnInit() {
    this.loadMenus();
    this.progressBarService.updateProgressBar$.subscribe((mode: string) => {
      this.progressBarMode = mode;
    });
  }


  private loadMenus(): void {
    this.menuItems = [
      {link: '/', name: 'home'},
      {link: '/' + AppConfig.routes.entries, name: 'heroesList'}
    ];
  }
}
