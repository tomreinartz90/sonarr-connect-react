/**
 * Created by taren on 20-1-2017.
 */
export class SonarrConfig {
  protocol: 'http://' | 'https://' = 'https://';
  url: string;
  apiKey: string;
  daysInCalendar: number           = 7;
  wantedItems: number              = 15;
  historyItems: number             = 50;
  backgroundInterval: number       = 5;
  //allow setting props via index signature
  [key: string]: any;

  constructor( base?: Object ) {
    if ( base ) {
      Object.assign( this, base );
    }
  }

  getFullUrl() {
    return this.protocol + this.url;
  }
}
