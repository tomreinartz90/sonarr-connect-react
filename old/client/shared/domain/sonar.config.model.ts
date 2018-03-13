/**
 * Created by taren on 20-1-2017.
 */
export class SonarrConfig {
  protocol: 'http://' | 'https://' = 'https://';
  url: string;
  apiKey: string;
  daysInCalendar: number = 7;
  wantedItems: number = 15;
  historyItems: number = 15;
  backgroundInterval: number = 5;

  constructor(base?: Object) {
    if (base) {
      Object.assign(this, base);
    }
  }

  getFullUrl(){
    return this.protocol + this.url;
  }
}
