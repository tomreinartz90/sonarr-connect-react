/**
 * Created by taren on 27-1-2017.
 */

import { Component, OnInit, Input } from '@angular/core';
import { SonarrUtil } from "../../shared/sonarr.util";
import { SonarrService } from "../../shared/sonarr.service";

@Component( {
  selector: 'episode',
  templateUrl: 'episode.component.html'
} )
export class EpisodeComponent implements OnInit {

  @Input()
  episode: any;

  private loading: boolean = false;


  constructor( private util: SonarrUtil, private sonarr: SonarrService ) {
  }

  ngOnInit() {
  }


  getEpisodeNumber() {
    if ( this.episode ) {
      return this.util.formatEpisodeNumer( this.episode.seasonNumber, this.episode.episodeNumber )
    } else {
      return null
    }
  }

  isAirdateBeforeNow() {
    return (this.episode && this.episode.airDateUtc && new Date( this.episode.airDateUtc ).toISOString() < new Date().toISOString())
  }

  toggleEpisodeMonitored() {
    if ( !this.loading ) {
      this.loading           = true;
      this.episode.monitored = !this.episode.monitored;
      this.sonarr.setEpisode( this.episode ).subscribe( resp => {
        this.loading = false;
      }, () => {
        this.episode.monitored = !this.episode.monitored;
        this.loading           = false;
      } )
    }
  }

}
