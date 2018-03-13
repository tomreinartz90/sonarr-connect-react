import {Component, OnInit} from "@angular/core";
import {SonarrService} from "../../shared/sonarr.service";
import {fadeInOut} from "../../shared/animation.util";
import {SonarrSeriesEpisode} from "../../shared/domain/sonarr-series-episode.model";

@Component( {
  selector: 'my-calendar',
  templateUrl: 'calendar.component.html',
  animations: [ fadeInOut ],
  host: { '[@fadeInOut]': '' }
} )
export class CalendarComponent implements OnInit {

  wanted: any;
  calendar: Array<{date: Date, episodes: Array<SonarrSeriesEpisode>}>;

  constructor( private sonarr: SonarrService ) {
    // Do stuff
  }

  ngOnInit() {
    this.getCalendar();
  }

  getCalendar() {

    this.sonarr.getCalendar().subscribe( ( resp: Array<SonarrSeriesEpisode> ) => {
        if ( resp ) {
          let calendarDates: Array<string>                                               = [];
          let groupedEpisodes: Array<{date: Date, episodes: Array<SonarrSeriesEpisode>}> = [];
          //create list of dates where episodes are aired
          resp.forEach( episode => {
            if ( calendarDates.indexOf( episode.airDate ) == -1 ) {
              calendarDates.push( episode.airDate )
            }
          } );


          calendarDates.forEach( date => {
            groupedEpisodes.push( {
              date: new Date( date ),
              episodes: resp.filter( episode => episode.airDate == date )
            } );
          } );

          this.calendar = groupedEpisodes;
        }
      }
    )
  }

  onlyUnique( value: any, index: number, self: Array<any> ) {
    return self.indexOf( value ) === index;
  };

}
