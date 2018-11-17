import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeroDetailPageComponent} from './pages/hero-detail-page/hero-detail-page.component';
import { EntriesListPageComponent } from './pages/entries-list-page/entries-list-page.component';

const blogRoutes: Routes = [
  {path: '', component: EntriesListPageComponent},
  {path: ':id', component: HeroDetailPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(blogRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class BlogRoutingModule {
}
