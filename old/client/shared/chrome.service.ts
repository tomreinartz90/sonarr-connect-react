/**
 * @Author Reinartz.T
 * <<Explain class>> ${}
 */
import { Injectable } from "@angular/core";
import { SonarrService, StorageService } from "./index";
declare let chrome: any;

@Injectable()
export class ChromeService {

  constructor( private settings: StorageService, private sonarr: SonarrService ) {
    this.setTimer();
  }

  getItemsInHistory() {
    this.sonarr.getWanted( 0 ).subscribe( resp => {
      this.setBadge( resp.totalRecords );
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
    setInterval( () => {
        this.getItemsInHistory();
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
