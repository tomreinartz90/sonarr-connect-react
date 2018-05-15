import { SonarrSeriesModel } from "../shared/domain/sonarr-series.model";

export function searchShow( searchQuery: string ) {
  return {
    type: 'SEARCH_LIST',
    searchQuery
  }
}

export function updateList( series: Array<SonarrSeriesModel> = [] ) {
  return {
    type: 'UPDATE_LIST',
    series
  }
}