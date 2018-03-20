import { DataManagerComponent } from "../core/Data.manager.component";
import { SonarrService } from "../../shared/sonarr.service";
import * as React from "react";
import { SonarrSeriesEpisode } from "../../shared/domain/sonarr-series-episode.model";
import { EpisodeComponent } from "../episode/episode.component";

export class WantedComponent extends DataManagerComponent<Array<SonarrSeriesEpisode>, {}> {

  sonarr: SonarrService = new SonarrService();

  getData() {
    return this.sonarr.getWanted();
  }

  render() {
    const episodes: Array<SonarrSeriesEpisode> = this.state ? this.state.data : [];
    return (
        <div className="wanted">
          {episodes.length > 0 ? <h3>Wanted</h3> : null}
          {episodes.map( episode => {
            return <EpisodeComponent episode={episode} key={episode.id}/>
          } )}
        </div>
    );
  }
}