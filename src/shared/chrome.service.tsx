/**
 * @Author Reinartz.T
 * <<Explain class>> ${}
 */
import { StorageService } from "./storage.service";
import { SonarrService } from "./sonarr.service";

declare let chrome: any;

export class ChromeService {

  private settings = new StorageService();
  private sonarr   = new SonarrService();

  constructor() {
    this.setTimer();
  }

  getBadgeCountFromSonarr() {
    this.sonarr.getWanted( 0 ).subscribe( ( resp: any ) => {
      if ( resp ) {
        this.setBadge( `${resp.totalRecords}` );
      }
    } )
  }

  setBadge( num: any ) {
    if ( chrome && chrome.browserAction ) {
      if ( num > 0 ) {
        chrome.browserAction.setBadgeText( { text: num } );
      } else {
        chrome.browserAction.setBadgeText( { text: '' } );
      }
    }
  }

  setTimer() {
    // set interval
    setTimeout( () => {
          this.getBadgeCountFromSonarr();
          this.setTimer();
        },
        (this.settings.getSonarrConfig().backgroundInterval || 5) * 60000
    )

  }

  isBackgroundScript() {
    let name    = 'background';
    let url     = window.location.href;
    name        = name.replace( /[\[\]]/g, "\\$&" );
    let regex   = new RegExp( "[?&]" + name + "(=([^&#]*)|&|#|$)" ),
        results = regex.exec( url );
    if ( !results ) {
      return false;
    }
    if ( !results[ 2 ] ) {
      return false;
    }
    return decodeURIComponent( results[ 2 ].replace( /\+/g, " " ) );
  }


}
