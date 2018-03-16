import { DataManagerComponent } from "../core/Data.manager.component";
import { SonarrService } from "../../shared/sonarr.service";
import * as React from "react";
import { SonarrSeriesEpisode } from "../../shared/domain/sonarr-series-episode.model";
import { EpisodeComponent } from "../episode/episode.component";

export class CalendarComponent extends DataManagerComponent<Array<{ date: Date, episodes: Array<SonarrSeriesEpisode> }>, {}> {

  sonarr: SonarrService = new SonarrService();

  getData() {
    return this.sonarr.getGroupedCalendar();
  }

  render() {
    const calendar: Array<{ date: Date, episodes: Array<SonarrSeriesEpisode> }> = this.state ? this.state.data : [];
    return calendar.map( date => (
            <div key={date.date.getTime()}>
              <h3> {date.date.toLocaleDateString()} </h3>
              <div>{date.episodes.map( episode => <EpisodeComponent episode={episode} key={episode.id}/> )}</div>
            </div>
        )
    )
  }
}