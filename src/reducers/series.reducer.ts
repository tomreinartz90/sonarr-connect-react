import { SonarrSeriesModel } from "../shared/domain/sonarr-series.model";

export type SonarrSeriesState = { shows: Array<SonarrSeriesModel>, filteredShows: Array<SonarrSeriesModel>, searchQuery: string };

const getFilteredShows = ( shows: Array<SonarrSeriesModel> = [], searchQuery?: string ) => {
  if ( searchQuery && searchQuery.trim() != "" ) {
    return shows.filter( show => (show.cleanTitle.indexOf( searchQuery.replace( / /g, '' ).toLowerCase() ) != -1) );
  }
  return shows;
};


export const series = ( state: SonarrSeriesState = { shows: [], filteredShows: [], searchQuery: "" },
                        action: { type: string, series: Array<SonarrSeriesModel>, searchQuery: string } ) => {
  const newState = { ...state };

  switch ( action.type ) {
    case 'SERIES_SEARCH_LIST':
      newState.filteredShows = getFilteredShows( newState.shows, action.searchQuery );
      break;

    case 'SERIES_UPDATE_LIST':
      newState.shows         = action.series;
      newState.filteredShows = getFilteredShows( newState.shows, newState.searchQuery );
      break;
    default:
      break;
  }

  return newState;
};

