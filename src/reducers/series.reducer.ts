import { SonarrSeriesModel } from "../shared/domain/sonarr-series.model";


const getFilteredShows = ( shows: Array<SonarrSeriesModel> = [], searchQuery?: string ) => {
  if ( searchQuery && searchQuery != "" ) {
    return shows.filter( show => (show.cleanTitle.indexOf( searchQuery.replace( / /g, '' ).toLowerCase() ) != -1) );
  }
  return shows;
};


export const series = ( state: { shows: Array<SonarrSeriesModel>, filteredShows: Array<SonarrSeriesModel>, searchQuery: string } = { shows: [], filteredShows: [], searchQuery: "" },
                        action: { type: string, series: Array<SonarrSeriesModel>, searchQuery: string } ) => {
  const newState = { ...state };

  switch ( action.type ) {
    case 'UPDATE_LIST':
    case 'SEARCH_LIST':
      newState.searchQuery   = action.searchQuery || newState.searchQuery;
      newState.shows         = action.series || newState.shows;
      newState.filteredShows = getFilteredShows( newState.shows, newState.searchQuery );
      break;
    default:
      break;
  }

  return newState;
};

