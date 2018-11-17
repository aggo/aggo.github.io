import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AppConfig } from '../../../../configs/app.config';
import { UtilsHelperService } from '../../../../core/services/utils-helper.service';
import { HeroRemoveComponent } from '../../components/hero-remove/hero-remove.component';
import { TILEntry } from '../../shared/entry.model';
import { EntriesService } from '../../shared/entries.service';

@Component({
  selector: 'app-entries-list-page',
  templateUrl: './entries-list-page.component.html',
  styleUrls: ['./entries-list-page.component.scss'],
  animations: [UtilsHelperService.fadeInOut()]
})

export class EntriesListPageComponent implements OnInit {

  entries: TILEntry[];
  newEntryForm: FormGroup;
  canVote = false;
  error: string;
  @ViewChild('form') myNgForm; // just to call resetForm method

  constructor(private entrieService: EntriesService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.canVote = EntriesService.checkIfUserCanVote();

    this.newEntryForm = this.formBuilder.group({
      'content': new FormControl('', [Validators.required]),
      'source': new FormControl('', [Validators.required])
    });

    this.onChanges();
  }

  ngOnInit() {
    this.entrieService.getHeroes().subscribe((entries: Array<TILEntry>) => {
      this.entries = entries;
    });
  }

  createNewHero(newHero: any) {
    if (this.newEntryForm.valid) {
      this.entrieService.createHero(new TILEntry(newHero)).then(() => {
        this.myNgForm.resetForm();
      }, () => {
        this.error = 'errorHasOcurred';
      });
    }
  }

  like(entry: TILEntry) {
    this.canVote = EntriesService.checkIfUserCanVote();
    if (this.canVote) {
      entry.like();
      this.entrieService.updateHero(entry);
    }
  }

  deleteHero(hero: TILEntry) {
    const dialogRef = this.dialog.open(HeroRemoveComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.entrieService.deleteHero(hero.id).then(() => {
          this.entrieService.showSnackBar('heroRemoved');
        }, () => {
          this.error = 'heroDefault';
        });
      }
    });
  }

  seeHeroDetails(hero): void {
    if (hero.default) {
      this.router.navigate([AppConfig.routes.entries + '/' + hero.id]);
    }
  }

  private onChanges() {
    this.newEntryForm.get('name').valueChanges.subscribe((value) => {
      if (value && value.length >= 3 && UtilsHelperService.isPalindrome(value)) {
        this.snackBar.open('Palindrome');
      } else {
        this.snackBar.dismiss();
      }
    });
  }
}
