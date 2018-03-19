import { SonarrUtil } from './sonarr.util';
import { SonarrSeriesModel } from './domain/sonarr-series.model';
import { SonarrImageModel } from './domain/sonarr-image.model';
import { SonarrSeriesEpisode } from './domain/sonarr-series-episode.model';
import { Observable } from 'rxjs/Rx';
import { StorageService } from './storage.service';
import { SonarrConfig } from "./domain/sonar.config.model";
import { DataManager } from "./data.manager.service";

export class SonarrService {
  activeShow: DataManager<SonarrSeriesModel> = new DataManager<SonarrSeriesModel>( 'active-show' );
  util = new SonarrUtil();
  storage = new StorageService();

  getCalendar(): Observable<Array<SonarrSeriesEpisode>> {
    let params = this.getSonarrUrlAndParams().params;
    params.set( 'start', this.util.formatDate( new Date(), null ) );
    params.set( 'end', this.util.formatDate( new Date(), this.storage.getSonarrConfig().daysInCalendar ) );
    return this.get<Array<SonarrSeriesEpisode>>( '/calendar', params )
      .do( (resp => {
        this.storage.setItem( 'calendar', resp );
      }) ).startWith( this.storage.getItem( 'calendar' ) ).map( data => data.map( ( item: Object ) => new SonarrSeriesEpisode( item ) ) );
  }

  getGroupedCalendar(): Observable<Array<{ date: Date, episodes: Array<SonarrSeriesEpisode> }>> {
    return this.getCalendar().map( data => {
      if ( data ) {
        let calendarDates: Array<Date> = [];
        let groupedEpisodes: Array<{ date: Date, episodes: Array<SonarrSeriesEpisode> }> = [];
        //create list of dates where episodes are aired
        data.forEach( episode => {
          if ( !calendarDates.some( data => this.util.isDataDayTheSame( data, episode.airDateUtc ) ) ) {
            calendarDates.push( episode.airDateUtc );
          }
        } );

        calendarDates.forEach( date => {
          groupedEpisodes.push( {
            date: date,
            episodes: data.filter( episode => this.util.isDataDayTheSame( date, episode.airDateUtc ) )
          } );
        } );

        return groupedEpisodes;
      }
      return [];
    } );
  }

  getWanted( page: number = 0 ): Observable<{ pageSize: number, page: number, records: Array<SonarrSeriesEpisode>, totalRecords: number }> {
    let params = this.getSonarrUrlAndParams().params;
    params.set( 'pageSize', String( this.storage.getSonarrConfig().wantedItems ) );
    params.set( 'page', String( page + 1 ) );
    // params.set('end', this.util.formatDate(new Date(), this.storage.getSonarrConfig().daysInCalendar));
    return this.get<Array<SonarrSeriesEpisode>>( '/wanted/missing', params )
      .do( resp => {
        this.storage.setItem( 'missing', resp );
      } ).startWith( this.storage.getItem( 'missing' ) );
  }

  getSeries(): Observable<Array<SonarrSeriesModel>> {
    let params = this.getSonarrUrlAndParams().params;
    params.set( 'pageSize', String( this.storage.getSonarrConfig().wantedItems ) );
    params.set( 'sort_by', 'sortTitle' );
    params.set( 'order', 'asc' );
    return this.get<Array<SonarrSeriesModel>>( '/series', params )
      .map( data => {
        return data.sort( this.util.seriesComparator );
      } )
      .do( (resp => {
        this.storage.setItem( 'series', resp );
      }) ).startWith( this.storage.getItem( 'series' ) );
  }

  getEpisodesForSeries( seriesId: number ): Observable<Array<SonarrSeriesEpisode>> {
    let params = this.getSonarrUrlAndParams().params;
    params.set( 'seriesId', String( seriesId ) );
    // http://192.168.1.100:8989/api/episode?seriesId=10&apikey=aa9838e7d4444602849061ca1a6bffa7
    return this.get<Array<SonarrSeriesEpisode>>( '/episode', params );
  }

  getHistory( page: number = 0 ): Observable<Array<SonarrSeriesEpisode>> {
    let params = this.getSonarrUrlAndParams().params;
    params.set( 'pageSize', String( this.storage.getSonarrConfig().historyItems ) );
    params.set( 'page', String( page + 1 ) );
    return this.get<{ records: Array<Array<SonarrSeriesEpisode>> }>( '/history', params ).map( resp => resp.records )
      .do( (resp => {
        this.storage.setItem( 'history', resp );
      }) ).startWith( this.storage.getItem( 'history' ) );
  }

  getSeriesUrl( series: SonarrSeriesModel, type: 'banner' | 'poster' ) {
    const image: SonarrImageModel | undefined = series.images.find( ( image: SonarrImageModel ) => image.coverType == type );
    if ( image ) {
      if ( image.url.indexOf( 'MediaCover' ) ) {
        let start = image.url.indexOf( 'MediaCover' );
        return this.getSonarrUrlAndParams().url + image.url.substring( start ) + '&apikey=' + this.getSonarrUrlAndParams().apiKey;
      } else {
        return image.url;
      }
    }
    return '';
  }

  setEpisode( episode: SonarrSeriesEpisode ) {
    let url = this.getSonarrUrlAndParams().url;
    let apiKey = this.getSonarrUrlAndParams().apiKey;

    if ( url && apiKey ) {
      return Observable.ajax.put( url + '/episode/' + episode.id, JSON.stringify( episode ) );
    } else {
      return Observable.empty();
    }
  }

  getSystemStatus() {
    let params = this.getSonarrUrlAndParams().params;
    return this.get<Object>( '/system/status', params );
  }

  getConfig() {
    return this.storage.getSonarrConfig();
  }

  setConfig( config: SonarrConfig ) {
    this.storage.setSonarrConfig( config );
  }

  private get<T>( path: string, params: URLSearchParams ): Observable<T> {
    let url = this.getSonarrUrlAndParams().url;
//    let apiKey  = this.getSonarrUrlAndParams().apiKey;
//    let params = this.getSonarrUrlAndParams().params;
    return Observable.ajax.getJSON( url + path + '?' + params.toString() );
//    if ( url && apiKey ) {
//      return this.http.get( url + path, { search: params } ).map( resp => resp.json() );
//    } else {
    // goto config page when url or api key is not found
//      return Observable.never();
//    }
  }

  private getSonarrUrlAndParams(): { url: string, params: URLSearchParams, apiKey: string } {
    let params = new URLSearchParams();
    let url = this.storage.getSonarrConfig().getFullUrl() + '/api/';
    let apiKey: string = this.storage.getSonarrConfig().apiKey;

    params.set( 'apikey', apiKey );

    return { url: url, params: params, apiKey: apiKey };
  }


}
