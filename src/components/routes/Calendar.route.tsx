import * as React from 'react';
import { RouteHeader } from "./Route.header";
import { CalendarComponent } from "../calendar/Calendar.component";
import { WantedComponent } from "../wanted/wanted.component";
import { SonarrSeriesEpisode } from "../../shared/domain/sonarr-series-episode.model";

export class CalendarRoute extends React.Component<{ calendar: Array<{ date: Date, episodes: Array<SonarrSeriesEpisode> }>, wanted: Array<SonarrSeriesEpisode>, }, {}> {
  render() {
    return (
      <div className="calendar">
        <RouteHeader name="Calendar"/>
        <WantedComponent wanted={this.props.wanted}/>
        <CalendarComponent calendar={this.props.calendar}/>
      </div>
    );
  }
}
