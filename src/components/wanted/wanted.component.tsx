import * as React from "react";
import { SonarrSeriesEpisode } from "../../shared/domain/sonarr-series-episode.model";
import { EpisodeComponent } from "../episode/episode.component";

export class WantedComponent extends React.Component<{ wanted: Array<SonarrSeriesEpisode> }> {

  render() {
    const episodes: Array<SonarrSeriesEpisode> = this.props ? this.props.wanted : [];
    return (
      <div className="wanted">
        {episodes.length > 0 ? <h3>Wanted</h3> : null}
        {episodes.map( episode => {
          return <EpisodeComponent episode={episode} key={episode.id}/>;
        } )}
      </div>
    );
  }
}