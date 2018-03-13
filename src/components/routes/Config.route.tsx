import * as React from 'react';
import { ChangeEvent } from 'react';
import { RouteHeader } from "./Route.header";
import { DataManagerComponent } from "../core/Data.manager.component";
import { SonarrConfig } from "../../shared/domain/sonar.config.model";
import { SonarrService } from "../../shared/sonarr.service";
import { Observable } from "rxjs/Rx";
import { DataManager } from "../../shared/data.manager.service";

export class ConfigRoute extends DataManagerComponent<SonarrConfig, any> {
  private sonarr: SonarrService = new SonarrService();
  private navigation            = new DataManager<string>( 'navigation' );

  getData() {
    return Observable.of( this.sonarr.getConfig() );
  }

  setConfig = () => {
    this.sonarr.setConfig( this.state.data );
    this.sonarr.getSystemStatus().subscribe( ( status ) => {
      console.log( status );
      this.navigation.setData( 'welcome' );
    } );
  };

  testConfig = () => {
    return;
  };

  handleInputChange = ( event: ChangeEvent<any> ) => {
    const target            = event.target;
    const value             = target.type === 'checkbox' ? target.checked : target.value;
    const name              = target.name;
    this.state.data[ name ] = value;
    this.setState( {
      [ name ]: value
    } );
  };

  render() {
    const config = this.state ? this.state.data : null;
    return (
        <div>
          <RouteHeader name="config"/>
          {!config ? null :
              <div className="card column">
                <div className="row">
                  <div className="column small-12">
                    <h6>Url</h6>
                    <div className="row is-collapse-child">
                      <select className="small-3" value={config.protocol} name="protocol" onChange={this.handleInputChange}>
                        <option value="https://">https://</option>
                        <option value="http://">http://</option>
                      </select>
                      <input className="small-9" type="text" value={config.url} name="url" onChange={this.handleInputChange}/>
                    </div>
                  </div>
                  <div className="column small-12">
                    <h6>API key</h6>
                    <input type="text" value={config.apiKey} name="apiKey" onChange={this.handleInputChange}/>
                  </div>
                  <div className="column small-12">
                    <h6>Number of days to show in calendar:</h6>
                    <input type="number" min="0" value={config.daysInCalendar} name="daysInCalendar" onChange={this.handleInputChange}/>
                  </div>
                  <div className="column small-12">
                    <h6>Wanted Items:</h6>
                    <input type="number" min="0" value={config.wantedItems} name="wantedItems" onChange={this.handleInputChange}/>
                  </div>
                  <div className="column small-12">
                    <h6>History Items:</h6>
                    <input type="number" min="0" value={config.historyItems} name="historyItems" onChange={this.handleInputChange}/>
                  </div>
                  <div className="column small-12">
                    <h6>Background interval: time in minutes</h6>
                    <input type="number" min="0" value={config.backgroundInterval} name="backgroundInterval" onChange={this.handleInputChange}/>
                  </div>
                  {/*
    <div className="test-status">
      <span className="label success">Connected</span>
      <span className="label warning">Could not Connect</span>
      to Sonarr with version {testStatus?.info?.version}
    </div>*/}

                  <div className="column small-12">
                    <button className="button success float-right" onClick={this.setConfig}>Save</button>
                    <button className="button float-right" onClick={this.testConfig}>Test</button>
                  </div>
                </div>
              </div>
          }
        </div>);
  }
}
