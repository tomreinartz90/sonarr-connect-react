import { SonarrSeriesModel } from "../shared/domain/sonarr-series.model";

export const series = ( state: { shows: Array<SonarrSeriesModel>, filteredShows: Array<SonarrSeriesModel>, searchQuery: string } = {
  shows: [],
  filteredShows: []
}, action: { type: string, series: Array<SonarrSeriesModel>, search: string } ) => {
  const newState = { ...state };

  switch ( action.type ) {
    case 'UPDATE_LIST':
    case 'SEARCH_LIST':
      newState.searchQuery = action.searchQuery || newState.searchQuery;
      newState.shows = action.series || newState.series;
      newState.filteredShows = getFilteredShows( newState.shows, newState.searchQuery );
  }

  return newState;
};

const getFilteredShows = ( shows: Array<SonarrSeriesModel> = [], searchQuery?: string ) => {
  if ( searchQuery && searchQuery != "" ) {
    return shows.filter( show => (show.cleanTitle.indexOf( searchQuery.replace( / /g, '' ).toLowerCase() ) != -1) );
  }
  return shows;
};