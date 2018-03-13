/**
 * Created by taren on 27-1-2017.
 */
import {Component, OnInit, Input} from "@angular/core";
import {SonarrUtil} from "../../shared/sonarr.util";
import {SonarrSeriesModel} from "../../shared/domain/sonarr-series.model";
import {SonarrService} from "../../shared/sonarr.service";

@Component({
  selector: 'show',
  templateUrl: 'show.component.html'
})
export class Showomponent implements OnInit {

  @Input()
  show: SonarrSeriesModel;

  constructor(private util: SonarrUtil, private sonarr:SonarrService) {
  }

  ngOnInit() {
  }

  getPoster() {
    return this.sonarr.getSeriesUrl(this.show, "poster");
  }

  getEpisodeLabelClass() {
    if (this.show)
      return this.util.calculateEpisodeQuoteColor(this.show.episodeFileCount, this.show.episodeCount, this.show.monitored, this.show.status)
    return null;
  }

  selectShow(show:SonarrSeriesModel){
    this.sonarr.activeShow = show;
  }
}
