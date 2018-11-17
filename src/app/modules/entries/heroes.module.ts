import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BlogRoutingModule} from './heroes-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {HeroRemoveComponent} from './components/hero-remove/hero-remove.component';
import {HeroDetailPageComponent} from './pages/hero-detail-page/hero-detail-page.component';
import { EntriesListPageComponent } from './pages/entries-list-page/entries-list-page.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BlogRoutingModule
  ],
  declarations: [
    EntriesListPageComponent,
    HeroDetailPageComponent,
    HeroRemoveComponent
  ],
  entryComponents: [
    HeroRemoveComponent
  ]
})

export class HeroesModule {
}
