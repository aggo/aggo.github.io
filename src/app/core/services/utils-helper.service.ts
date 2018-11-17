import { Injectable } from '@angular/core';
import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class UtilsHelperService {
  static fadeInOut(): AnimationTriggerMetadata {
    return trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate(500, style({opacity: 1}))
      ]),
      transition(':leave', [
        animate(500, style({opacity: 0}))
      ])
    ]);
  }

  static isPalindrome(str) {
    const len = Math.floor(str.length / 2);
    for (let i = 0; i < len; i++) {
      if (str[i] !== str[str.length - i - 1]) {
        return false;
      }
    }
    return true;
  }
}
