import * as React from "react";
import { SonarrSeriesEpisode } from "../../shared/domain/sonarr-series-episode.model";
import { EpisodeComponent } from "../episode/episode.component";

export class CalendarComponent extends React.Component<{ calendar: Array<{ date: Date, episodes: Array<SonarrSeriesEpisode> }> }> {

  render() {
    const calendar: Array<{ date: Date, episodes: Array<SonarrSeriesEpisode> }> = this.props ? this.props.calendar : [];
    return calendar.map( date => (
        <div key={date.date.getTime()}>
          <h3> {date.date.toLocaleDateString()} </h3>
          <div>{date.episodes.map( episode => <EpisodeComponent episode={episode} key={episode.id}/> )}</div>
        </div>
      )
    );
  }
}