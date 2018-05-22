import { SonarrSeriesModel } from "../shared/domain/sonarr-series.model";
import { SonarrService } from "../shared/sonarr.service";

const sonarrService: SonarrService = new SonarrService();

export function searchShow( searchQuery: string ) {
  return {
    type: 'SERIES_SEARCH_LIST',
    searchQuery
  }
}

export function updateList( series: Array<SonarrSeriesModel> = [] ) {
  return {
    type: 'SERIES_UPDATE_LIST',
    series
  }
}

export function initList( dispatch: any ) {
  dispatch( {
    type: 'SERIES_INIT_LIST',
  } );

  sonarrService.getSeries().subscribe( ( series ) => {
    dispatch( updateList( series ) );
  } )
}

