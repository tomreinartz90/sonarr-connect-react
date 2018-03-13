/**
 * Created by taren on 20-1-2017.
 */
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Http, URLSearchParams } from "@angular/http";
import { StorageService } from "./storage.service";
import { SonarrUtil } from "./sonarr.util";
import { SonarrSeriesModel } from "./domain/sonarr-series.model";
import { SonarrImageModel } from "./domain/sonarr-image.model";
import { SonarrSeriesEpisode } from "./domain/sonarr-series-episode.model";
import { Observable } from "rxjs/Rx";


@Injectable()
export class SonarrService {
  activeShow: SonarrSeriesModel;


  constructor( private http: Http, private storage: StorageService, private util: SonarrUtil, private router: Router ) {
    console.log( 'init' )
  }

  private get( path: string, params: URLSearchParams ): Observable<any> {
    let url    = this.getSonarrUrlAndParams().url;
    let apiKey = this.getSonarrUrlAndParams().apiKey;
//    let parmams = this.getSonarrUrlAndParams().params;
    if ( url && apiKey ) {
      console.log( params.toString() );
      return Observable.ajax( url + path + '?' + params.toString() ).map( resp => resp.response );
//      return this.http.get( url + path, { search: params } ).map( resp => resp.json() );
    } else {
      //goto config page when url or api key is not found
      this.router.navigate( [ '/config' ] );
      return Observable.never();
    }
  }

  private getSonarrUrlAndParams(): { url: string, params: URLSearchParams, apiKey: string } {
    let params         = new URLSearchParams();
    let url            = this.storage.getSonarrConfig().getFullUrl() + "/api/";
    let apiKey: string = this.storage.getSonarrConfig().apiKey;

    params.set( 'apikey', apiKey );

    return { url: url, params: params, apiKey: apiKey }
  }

  getCalendar(): Observable<Array<SonarrSeriesEpisode>> {
    let params = this.getSonarrUrlAndParams().params;
    params.set( 'start', this.util.formatDate( new Date(), null ) );
    params.set( 'end', this.util.formatDate( new Date(), this.storage.getSonarrConfig().daysInCalendar ) );
    return this.get( "/calendar", params )
      .do( (resp => {
        this.storage.setItem( 'calendar', resp );
      }) ).startWith( this.storage.getItem( 'calendar' ) );
  }

  getWanted( page: number = 0 ): Observable<{ pageSize: number, page: number, records: Array<SonarrSeriesEpisode>, totalRecords: number }> {
    let params = this.getSonarrUrlAndParams().params;
    params.set( 'pageSize', String( this.storage.getSonarrConfig().wantedItems ) );
    params.set( 'page', String( page + 1 ) );
    // params.set('end', this.util.formatDate(new Date(), this.storage.getSonarrConfig().daysInCalendar));
    return this.get( "/wanted/missing", params )
      .do( (resp => {
        this.storage.setItem( 'missing', resp );
      }) ).startWith( this.storage.getItem( 'missing' ) )
  }

  getSeries(): Observable<Array<SonarrSeriesModel>> {
    let params = this.getSonarrUrlAndParams().params;
    params.set( 'pageSize', String( this.storage.getSonarrConfig().wantedItems ) );
    params.set( 'sort_by', 'sortTitle' );
    params.set( 'order', 'asc' );
    return this.get( "/series", params ).map( data => {
      data.sort( this.seriesComparator )
    } )
      .do( (resp => {
        this.storage.setItem( 'series', resp );
      }) ).startWith( this.storage.getItem( 'series' ) );
  }

  getEpisodesForSeries( seriesId: number ): Observable<Array<SonarrSeriesEpisode>> {
    let params = this.getSonarrUrlAndParams().params;
    params.set( 'seriesId', String( seriesId ) );
    // http://192.168.1.100:8989/api/episode?seriesId=10&apikey=aa9838e7d4444602849061ca1a6bffa7
    return this.get( "/episode", params )

  }

  getHistory( page: number = 0 ): Observable<Array<any>> {
    let params = this.getSonarrUrlAndParams().params;
    params.set( 'pageSize', String( this.storage.getSonarrConfig().historyItems ) );
    params.set( 'page', String( page + 1 ) );
    return this.get( "/history", params ).map( resp => resp.records )
      .do( (resp => {
        this.storage.setItem( 'history', resp );
      }) ).startWith( this.storage.getItem( 'history' ) );
  }

  getSeriesUrl( series: SonarrSeriesModel, type: 'banner' | 'poster' ) {
    let image: SonarrImageModel = series.images.find( ( image: SonarrImageModel ) => image.coverType == type );
    if ( image ) {
      if ( image.url.indexOf( 'MediaCover' ) ) {
        let start = image.url.indexOf( 'MediaCover' );
        return this.getSonarrUrlAndParams().url + image.url.substring( start ) + "&apikey=" + this.getSonarrUrlAndParams().apiKey;
      } else {
        return image.url;
      }
    }
    return '';
  }

  setEpisode( episode: SonarrSeriesEpisode ) {
    let url    = this.getSonarrUrlAndParams().url;
    let apiKey = this.getSonarrUrlAndParams().apiKey;

    if ( url && apiKey ) {
      return this.http.put( url + "/episode/" + episode.id, JSON.stringify( episode ) ).map( resp => resp.json() );
    } else {
      return Observable.empty();
    }
  }

  getSystemStatus() {
    let params = this.getSonarrUrlAndParams().params;
    return this.get( "/system/status", params )
  }

  // comparator to sort seasons by seasonNumber
  seriesComparator( a: SonarrSeriesModel, b: SonarrSeriesModel ) {
    if ( a.status != b.status ) {
      if ( a.status < b.status ) {
        return -1;
      }
      if ( a.status > b.status ) {
        return 1;
      }
      return 0;
    }
    if ( a.sortTitle < b.sortTitle ) {
      return -1;
    }
    if ( a.sortTitle > b.sortTitle ) {
      return 1;
    }
    return 0;
  }

}
