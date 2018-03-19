import { SonarrConfig } from "./domain/sonar.config.model";

declare let chrome: any;


export class StorageService {
  storage: Storage = localStorage;

  constructor() {
    if ( chrome && chrome.runtime && chrome.runtime.onMessage ) {
      chrome.runtime.onMessage.addListener( ( request: any ) => {
        console.log( request );
        if ( request.method == "setLocalStorage" ) {
          this.setItem( request.key, request.value, false );
        }
      } );
    }
  }

  setItem( key: string, value: any, shareUpdate: boolean = true ) {
    const stringValue = JSON.stringify( value );
    this.storage.setItem( key, stringValue );
    if ( chrome && chrome.runtime && shareUpdate ) {
      chrome.runtime.sendMessage('sonarr.connect.beta',  { method: "setLocalStorage", key, value } );
    }
  }

  getItem( key: string ) {
    let data = this.storage.getItem( key );
    return data ? JSON.parse( data ) : null;
  }

  getSonarrConfig() {
    return new SonarrConfig( this.getItem( 'config' ) );
  }

  setSonarrConfig( config: SonarrConfig ) {
    if ( config.url ) {
      config.url = config.url.replace( "http://", '' );
      config.url = config.url.replace( "https://", '' );
    }
    return this.setItem( 'config', config, true );
  }
}
