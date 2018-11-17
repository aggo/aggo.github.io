import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { LoggerService } from '../../../core/services/logger.service';
import { AppConfig } from '../../../configs/app.config';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { TILEntry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {
  private entriesCollection: AngularFirestoreCollection<TILEntry>;

  constructor(private afs: AngularFirestore,
              private snackBar: MatSnackBar) {
    this.entriesCollection = this.afs.collection<TILEntry>(AppConfig.routes.entries, (entries) => {
      return entries;
      // return entries.orderBy('default', 'desc').orderBy('date', 'desc');
    });
  }

  static checkIfUserCanVote(): boolean {
    return Number(localStorage.getItem('votes')) < AppConfig.votesLimit;
  }

  private static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      LoggerService.log(`${operation} failed: ${error.message}`);

      if (error.status >= 500) {
        throw error;
      }

      return of(result as T);
    };
  }

  getHeroes(): Observable<TILEntry[]> {
    return this.entriesCollection.snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((action) => {
            const data = action.payload.doc.data();
            return new TILEntry({id: action.payload.doc.id, ...data});
          });
        }),
        tap(() => LoggerService.log(`fetched entries`)),
        catchError(EntriesService.handleError('getHeroes', []))
      );
  }

  getHero(id: string): Observable<any> {
    return this.afs.doc(`${AppConfig.routes.entries}/${id}`).get().pipe(
      map((hero) => {
        return new TILEntry({id, ...hero.data()});
      }),
      tap(() => LoggerService.log(`fetched hero ${id}`)),
      catchError(EntriesService.handleError('getHero', []))
    );
  }

  createHero(hero: TILEntry): Promise<DocumentReference> {
    return this.entriesCollection.add(JSON.parse(JSON.stringify(hero))).then((document: DocumentReference) => {
      LoggerService.log(`added hero w/ id=${document.id}`);
      this.showSnackBar('heroCreated');
      return document;
    }, (error) => {
      EntriesService.handleError<any>('createHero', error);
      return error;
    });
  }

  updateHero(hero: TILEntry): Promise<void> {
    return this.afs.doc(`${AppConfig.routes.entries}/${hero.id}`).update(JSON.parse(JSON.stringify(hero))).then(() => {
      LoggerService.log(`updated hero w/ id=${hero.id}`);
      this.showSnackBar('saved');
    });
  }

  deleteHero(id: string): Promise<void> {
    return this.afs.doc(`${AppConfig.routes.entries}/${id}`).delete();
  }

  showSnackBar(name): void {
    // this.translateService.get([String(_('heroCreated')), String(_('saved')),
    //   String('heroLikeMaximum'), String('heroRemoved')], {'value': AppConfig.votesLimit}).subscribe((texts) => {
    //   const config: any = new MatSnackBarConfig();
    //   config.duration = AppConfig.snackBarDuration;
    //   this.snackBar.open(texts[name], 'OK', config);
    // });
  }
}
