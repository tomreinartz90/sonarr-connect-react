import * as React from 'react';
import { SonarrService } from "../shared/sonarr.service";
import { DataManagerComponent } from "../components/core/Data.manager.component";
import { Redirect } from "react-router-dom";

export class WelcomeRoute extends DataManagerComponent<any, {}> {
  private sonarr: SonarrService = new SonarrService();

  getData() {
    return this.sonarr.getSystemStatus();
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
