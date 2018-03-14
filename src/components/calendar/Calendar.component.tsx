import { DataManagerComponent } from "../core/Data.manager.component";
import { SonarrService } from "../../shared/sonarr.service";
import * as React from "react";
import { SonarrSeriesEpisode } from "../../shared/domain/sonarr-series-episode.model";
import { EpisodeComponent } from "../episode/episode.component";

export class CalendarComponent extends DataManagerComponent<Array<{ date: Date, episodes: Array<SonarrSeriesEpisode> }>, {}> {

  sonarr: SonarrService = new SonarrService();
  calendar: Array<{ date: Date; episodes: Array<SonarrSeriesEpisode> }>;

  getData() {
    return this.sonarr.getCalendar().map( data => {
      if ( data ) {
        let calendarDates: Array<string>                                                 = [];
        let groupedEpisodes: Array<{ date: Date, episodes: Array<SonarrSeriesEpisode> }> = [];
        //create list of dates where episodes are aired
        data.forEach( episode => {
          if ( calendarDates.indexOf( episode.airDate ) == -1 ) {
            calendarDates.push( episode.airDate )
          }
        } );

        calendarDates.forEach( date => {
          groupedEpisodes.push( {
            date: new Date( date ),
            episodes: data.filter( episode => episode.airDate == date )
          } );
        } );

        return groupedEpisodes;
      }
      return [];
    } );
  }

  render() {
    const calendar: Array<{ date: Date, episodes: Array<SonarrSeriesEpisode> }> = this.state ? this.state.data : [];
    return (
        <div>
          {calendar.map( date => {
            return (
                <div key={date.date.getTime()}>
                  <h3> {date.date.toISOString()} </h3>
                  <div>{date.episodes.map( episode => <EpisodeComponent episode={episode} key={episode.id}/> )}</div>
                </div>
            )
          } )
          }

        </div>
    );
  }
}