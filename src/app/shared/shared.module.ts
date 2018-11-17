import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material.module';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { HeroLoadingComponent } from './components/hero-loading/hero-loading.component';
import { LoadingPlaceholderComponent } from './components/loading-placeholder/loading-placeholder.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
    HomePageComponent,
    Error404PageComponent,
    HeaderComponent,
    SearchBarComponent,
    FooterComponent,
    SpinnerComponent,
    HeroCardComponent,
    HeroLoadingComponent,
    LoadingPlaceholderComponent
  ],
  exports: [
    CommonModule,
    MaterialModule,
    HeaderComponent,
    SearchBarComponent,
    FooterComponent,
    SpinnerComponent,
    HeroCardComponent,
    HeroLoadingComponent,
    LoadingPlaceholderComponent
  ]
})

export class SharedModule {
}
