import { SonarrUtil } from './sonarr.util';
import { SonarrSeriesModel } from './domain/sonarr-series.model';
import { SonarrImageModel } from './domain/sonarr-image.model';
import { SonarrSeriesEpisode } from './domain/sonarr-series-episode.model';
import { Observable } from 'rxjs/Rx';
import { StorageService } from './storage.service';
import { SonarrConfig } from "./domain/sonar.config.model";
import { SonarrHistoryItemModel } from "./domain/sonarr-history-item.model";

export class SonarrService {
  util = new SonarrUtil();
  storage = new StorageService();

  getCalendar(): Observable<Array<SonarrSeriesEpisode>> {
    const params = this.getSonarrUrlAndParams().params;
    params.set( 'start', this.util.formatDate( new Date(), null ) );
    params.set( 'end', this.util.formatDate( new Date(), this.storage.getSonarrConfig().daysInCalendar ) );

    const data$ = this.get<Array<SonarrSeriesEpisode>>( '/calendar', params );
    return this.mapDataAndStartWithLocalStorage<SonarrSeriesEpisode>( data$, 'calendar', SonarrSeriesEpisode );
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

  getTotalWanted(): Observable<number> {
    const params = this.getSonarrUrlAndParams().params;
    params.set( 'pageSize', '1' );
    params.set( 'page', '0' );
    return this.get<any>( '/wanted/missing', params ).map( resp => resp.totalRecords );
  }

  getWanted( page: number = 0 ): Observable<Array<SonarrSeriesEpisode>> {
    const params = this.getSonarrUrlAndParams().params;
    params.set( 'pageSize', String( this.storage.getSonarrConfig().wantedItems ) );
    params.set( 'page', String( page + 1 ) );
    // params.set('end', this.util.formatDate(new Date(), this.storage.getSonarrConfig().daysInCalendar));
    const data$ = this.get<{ records: Array<SonarrSeriesEpisode> }>( '/wanted/missing', params ).map( resp => resp.records );
    return this.mapDataAndStartWithLocalStorage<SonarrSeriesEpisode>( data$, 'missing', SonarrSeriesEpisode );
  }

  getSeries(): Observable<Array<SonarrSeriesModel>> {
    const params = this.getSonarrUrlAndParams().params;
    params.set( 'pageSize', String( this.storage.getSonarrConfig().wantedItems ) );
    params.set( 'sort_by', 'sortTitle' );
    params.set( 'order', 'asc' );
    const data$ = this.get<Array<SonarrSeriesModel>>( '/series', params ).map( data => data.sort( this.util.seriesComparator ) );
    return this.mapDataAndStartWithLocalStorage<SonarrSeriesModel>( data$, 'series', SonarrSeriesModel );
  }

  getEpisodesForSeries( seriesId: number ): Observable<Array<SonarrSeriesEpisode>> {
    const params = this.getSonarrUrlAndParams().params;
    params.set( 'seriesId', String( seriesId ) );
    // http://192.168.1.100:8989/api/episode?seriesId=10&apikey=aa9838e7d4444602849061ca1a6bffa7
    return this.get<Array<SonarrSeriesEpisode>>( '/episode', params ).map( episodes => episodes.map( episode => new SonarrSeriesEpisode( episode ) ) );
  }

  getHistory( page: number = 0 ): Observable<Array<SonarrHistoryItemModel>> {
    const params = this.getSonarrUrlAndParams().params;
    params.set( 'pageSize', String( this.storage.getSonarrConfig().historyItems ) );
    params.set( 'page', String( page + 1 ) );
    const data$ = this.get<{ records: Array<SonarrHistoryItemModel> }>( '/history', params ).map( resp => resp.records );
    return this.mapDataAndStartWithLocalStorage<SonarrHistoryItemModel>( data$, 'history', SonarrHistoryItemModel );
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
    const params = this.getSonarrUrlAndParams().params;
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
    return Observable.ajax.getJSON( url + path + '?' + params.toString() );
  }

  private getSonarrUrlAndParams(): { url: string, params: URLSearchParams, apiKey: string } {
    const params = new URLSearchParams();
    let url = this.storage.getSonarrConfig().getFullUrl() + '/api/';
    let apiKey: string = this.storage.getSonarrConfig().apiKey;
    params.set( 'apikey', apiKey );
    return { url: url, params: params, apiKey: apiKey };
  }

  /**
   * simple method to store data in locale storage and get the old set from it, and map the array of data to Objects by its ObjectConstructor.
   * @param data$
   * @param storageKey
   * @param objectConstructor
   * @returns {OperatorFunction<T, R>}
   */
  private mapDataAndStartWithLocalStorage<T>( data$: Observable<Array<T>>, storageKey: string, objectConstructor: any ): Observable<Array<T>> {
    return data$
      .do( resp => this.storage.setItem( storageKey, resp ) )
      .startWith( this.storage.getItem( storageKey ) )
      .filter( resp => resp != null )
      .map( data => data.map( ( item: Object ) => new objectConstructor( item ) ) );
  }


}
