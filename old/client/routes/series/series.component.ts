import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {SonarrService} from "../../shared/sonarr.service";
import {SonarrSeriesModel} from "../../shared/domain/sonarr-series.model";
import {fadeInOut} from "../../shared/animation.util";

@Component( {
  selector: 'series',
  templateUrl: 'series.component.html',
  animations: [fadeInOut],
  host: {'[@fadeInOut]': ''}
})

export class SeriesComponent implements OnInit {

  series: Array<SonarrSeriesModel> = [];
  activeSeries: number             = null;
  query: string                    = null;

  @ViewChild( 'searchBar' )
  searchBar: ElementRef = null;

  constructor( private sonarr: SonarrService, route: ActivatedRoute ) {
    // Do stuff
    route.params.subscribe( resp => {
      this.activeSeries = resp[ 'id' ];
      // console.log('params:', resp);
    } );
  }

  ngOnInit() {
    this.getSeries();
    this.sonarr.activeShow = null;

    if ( this.searchBar ) {
      this.searchBar.nativeElement.focus();
    }
  }

  get show(): SonarrSeriesModel {
    return this.sonarr.activeShow;
  }

  getFilteredSeries() {
    if ( this.series && this.query ) {
      return this.series.filter( serie => (serie.cleanTitle.indexOf( this.query.toLowerCase() ) != -1) );
    }
    return this.series;
  }

  getSeries() {
    this.sonarr.getSeries().subscribe( resp => {
      this.series = resp;
    } )
  }


}
