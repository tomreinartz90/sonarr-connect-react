import * as React from 'react';
import { DataManagerComponent } from "../core/Data.manager.component";
import { SonarrService } from "../../shared/sonarr.service";
import { DataManager } from "../../shared/data.manager.service";

export class WelcomeRoute extends DataManagerComponent<any, {}> {
  private sonarr: SonarrService = new SonarrService();
  private navigation = new DataManager<any[]>( 'navigation' );


  getData() {
    return this.sonarr.getSystemStatus().do( ( data ) => {
      this.navigation.setData( ['calendar'] );
    }, (  ) => {
      this.navigation.setData( ['config'] );
    } );
  }

  getConnected() {
    return "Connected to Sonarr " + (this.state ? this.state.data.version : null);
  }

  getConnecting() {
    return "Connecting to Sonarr";
  }

  getError() {
    return "Could not connect to Sonarr";
  }

  getWelcome() {
    if ( this.state && this.data ) {
      return this.getConnected();
    } else if ( this.state && !this.data ) {
      return this.getError();
    } else {
      return this.getConnecting();
    }

  }

  render() {
    return (
      <div className="welcome">
        <h2>{this.getWelcome()}</h2>
      </div>
    );
  }
}
