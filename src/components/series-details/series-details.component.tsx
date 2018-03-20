import { DataManagerComponent } from "../core/Data.manager.component";
import { SonarrService } from "../../shared/sonarr.service";
import * as React from "react";
import { SonarrSeriesModel } from "../../shared/domain/sonarr-series.model";
import { Observable } from "rxjs/Observable";
import { Navigation } from "../../shared/Navigation";
import { SeriesEpisodeListComponent } from "./series-episode-list.component";

export class SeriesDetailsComponent extends DataManagerComponent<SonarrSeriesModel | undefined, {}> {

  sonarr: SonarrService = new SonarrService();
  navigation: Navigation = new Navigation();

  getData(): Observable<SonarrSeriesModel | undefined> {
    return this.navigation.getStateAndParams().mergeMap( stateAndParams => {
      if ( stateAndParams.state == 'series' && stateAndParams.params.has( 'showId' ) ) {
        return this.sonarr.getSeries().take( 1 ).map( series => series.find( show => show.id == stateAndParams.params.get( 'showId' ) ) );
      }
      return Observable.of( undefined );

    } );
  }

  getPoster( show: SonarrSeriesModel ) {
    return this.sonarr.getSeriesUrl( show, "poster" );
  }

  getBanner( show: SonarrSeriesModel ) {
    return this.sonarr.getSeriesUrl( show, "banner" );
  }

  render() {
    const show: SonarrSeriesModel | undefined = this.state ? (this.state.data ) : undefined;
    console.log( show );
    if ( show ) {
      return (
        <div className="show">
          <div className="banner">
            <img src={this.getBanner( show )}/>
          </div>
          <div className="row">
            <div className="small-4 show-poster">
              <img src={this.getPoster( show )}/>
            </div>
            <div className="column small-8 show-info">
              <h2><span id="title">{show.title}</span></h2>
              <h6 id="start-year">Started {show.firstAired.toLocaleDateString()}</h6>
              <h6 id="show-status"><i className="material-icons">play_arrow</i>{show.status}</h6>
              <h6>
                <i className="material-icons">collections_bookmark</i>
                <span id="seasons">Seasons {show.seasonCount}</span>
                <span id="episodes" className="{getEpisodeLabelClass()}">{show.episodeCount}/{show.episodeFileCount}</span>
              </h6>
              <h6>
                <i className="material-icons">access_time</i>
                <span id="air-time">{show.airTime}</span> on
                <span id="network" className="network">{show.network}</span>
              </h6>
            </div>
          </div>
          <div className="row">
            <p id="summary" className="summary">{show.overview}</p>
          </div>
          <SeriesEpisodeListComponent show={show}/>
        </div>
      );
    }
    return null;
  }
}