import * as React from 'react';
import { DataManagerComponent } from "../core/Data.manager.component";
import { SonarrService } from "../../shared/sonarr.service";
import { Navigation } from "../../shared/Navigation";
import { Redirect } from "react-router-dom";

export class WelcomeRoute extends DataManagerComponent<any, {}> {
  private sonarr: SonarrService = new SonarrService();
  private navigation = new Navigation(  );


  getData() {
    return this.sonarr.getSystemStatus().do( ( data ) => {
      this.navigation.setState( 'calendar' );
    }, (  ) => {
      this.navigation.setState( 'config' );
    } );
  }

  getConnecting() {
    return "Connecting to Sonarr";
  }

  getError() {
    return "Could not connect to Sonarr";
  }

  getWelcome() {
    if ( this.state && this.data ) {
      return <Redirect to="calendar"/>
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
