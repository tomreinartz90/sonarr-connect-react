import { DataManagerComponent } from "../core/Data.manager.component";
import { SonarrService } from "../../shared/sonarr.service";
import * as React from "react";
import { Observable } from "rxjs/Observable";
import { EpisodeComponent } from "../episode/episode.component";
import { SonarrSeriesEpisode } from "../../shared/domain/sonarr-series-episode.model";
import { SonarrSeriesModel } from "../../shared/domain/sonarr-series.model";

export class SeriesEpisodeListComponent extends DataManagerComponent<Array<SonarrSeriesEpisode>, { show: SonarrSeriesModel }> {

  sonarr: SonarrService = new SonarrService();
  private activeSeason: number;

  getData(): Observable<Array<SonarrSeriesEpisode>> {
    //make the last monitored season active by default
    this.activeSeason = this.props.show.seasons[this.props.show.seasons.length - 1].seasonNumber;
    return this.sonarr.getEpisodesForSeries( this.props.show.id );
  }

  render() {
    const episodes: Array<SonarrSeriesEpisode> = (this.props && this.props.show && this.state) ? this.state.data.filter( episode => episode.seasonNumber == this.activeSeason ) : [];
    if ( episodes && episodes.length ) {
      return (
        <div>
          <h3>Seasons</h3>
          <ul className="season-select menu expanded">
            {this.props.show.seasons.map( season => {
              return (
                <li key={season.seasonNumber} className={this.activeSeason == season.seasonNumber ? 'active' : ''}>
                  <a onClick={() => {
                    this.activeSeason = season.seasonNumber;
                    this.forceUpdate();
                  }}>
                    <h3>{season.seasonNumber}</h3>
                  </a>
                </li>
              );
            } )
            }
          </ul>
          {episodes.map( episode => <EpisodeComponent episode={episode} key={episode.id}/> )}
        </div>
      );
    }
    return <p>Loading episodes</p>;
  }
}