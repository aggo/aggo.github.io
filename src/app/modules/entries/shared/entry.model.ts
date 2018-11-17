import { Deserializable } from '../../../shared/interfaces/deserializable.interface';

export class TILEntry implements Deserializable {
  id: string;
  content: string;
  date: Date;
  source: string;
  // alterEgo: string;
  likes: number;
  // default: boolean;
  // avatarUrl: string;
  // avatarThumbnailUrl: string;

  constructor(entry: any = {}) {
    this.id = entry.id;
    this.content = entry.name || '';
    this.date = entry.date || new Date();
    this.source = entry.source || '';
    // this.alterEgo = hero.alterEgo || '';
    this.likes = entry.likes || 0;
    // this.default = hero.default || false;
    // this.avatarUrl = hero.avatarUrl || '';
    // this.avatarThumbnailUrl = hero.avatarThumbnailUrl || '';
  }

  like() {
    this.likes += 1;
    localStorage.setItem('votes', '' + (Number(localStorage.getItem('votes')) + 1));
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
