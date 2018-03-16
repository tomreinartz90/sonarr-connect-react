import * as React from 'react';
import { DataManagerComponent } from "../core/Data.manager.component";
import { SonarrService } from "../../shared/sonarr.service";
import { DataManager } from "../../shared/data.manager.service";

export class WelcomeRoute extends DataManagerComponent<any, {}> {
  private sonarr: SonarrService = new SonarrService();
  private navigation            = new DataManager<string>( 'navigation' );


  getData() {
    return this.sonarr.getSystemStatus().do( ( data ) => {
      this.navigation.setData( 'calendar' );
    }, ( err ) => {
      this.navigation.setData( 'config' );
    } );
  }

  getConnected() {
    return (
        <div>
          Welcome,
          Connected to Sonarr {this.state ? this.state.data.version : null}
        </div>
    )
  }

  getConnecting() {
    return (<div>Connecting to Sonarr</div>)
  }

  getError() {
    return (
        <div>
          Welcome,
          Could not connect to Sonarr
        </div>
    )
  }

  render() {
    if ( this.state && this.data ) {
      return this.getConnected();
    } else if ( this.state && !this.data ) {
      return this.getError();
    } else {
      return this.getConnecting()
    }
  }
}
