import { SonarrConfig } from "./domain/sonar.config.model";

export class StorageService {
  storage: Storage = localStorage;

  setItem( key: string, value: any ) {
    return this.storage.setItem( key, JSON.stringify( value ) );
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
    return this.setItem( 'config', config );
  }
}
