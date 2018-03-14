import { DataManagerComponent } from "../core/Data.manager.component";
import { SonarrService } from "../../shared/sonarr.service";
import * as React from "react";
import { SonarrSeriesEpisode } from "../../shared/domain/sonarr-series-episode.model";
import { EpisodeComponent } from "../episode/episode.component";

export class WantedComponent extends DataManagerComponent<Array<SonarrSeriesEpisode>, {}> {

  sonarr: SonarrService = new SonarrService();

  getData() {
    return this.sonarr.getWanted().map( resp => resp ? resp.records : [] );
  }

  render() {
    const episodes: Array<SonarrSeriesEpisode> = this.state ? this.state.data : [];
    return (
        episodes.map( episode => {
          return <EpisodeComponent episode={episode} key={episode.id}/>
        } )
    );
  }
}