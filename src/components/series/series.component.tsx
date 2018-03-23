import { DataManagerComponent } from "../core/Data.manager.component";
import { SonarrService } from "../../shared/sonarr.service";
import * as React from "react";
import { SonarrSeriesModel } from "../../shared/domain/sonarr-series.model";
import { ShowComponent } from "../show/show.component";
import { SeriesDetailsComponent } from "../series-details/series-details.component";
import { Navigation } from "../../shared/Navigation";
import { DataManager } from "../../shared/data.manager.service";

export class SeriesComponent extends DataManagerComponent<Array<SonarrSeriesModel>, {}, { showList: boolean, searchQuery: string }> {

  sonarr: SonarrService = new SonarrService();
  navigation: Navigation = new Navigation();
  search: DataManager<string> = new DataManager<string>( 'SeriesSearch' );

  getData() {
    return this.sonarr.getSeries();
  }

  componentDidMount() {
    super.componentDidMount();
    const nav$ = this.navigation.getStateAndParams().subscribe( stateAndParams => {
      this.setState( { showList: !stateAndParams.params.get( 'showId' ) } );
    } );

    const search$ = this.search.getData().debounceTime( 50 ).subscribe( query => this.setState( { searchQuery: query } ) );

    this.subscriptions.push( nav$ );
    this.subscriptions.push( search$ );
  }

  onAfterUpdateData( data: Array<SonarrSeriesModel> ) {
    return super.onAfterUpdateData( data );
  }

  getShows() {
    const shows: Array<SonarrSeriesModel> = (this.state && this.state.showList) ? (this.state.data || []) : [];
    if ( this.state && this.state.searchQuery && this.state.searchQuery != "" ) {
      return shows.filter( show => (show.cleanTitle.indexOf( this.state.searchQuery.replace( / /g, '' ).toLowerCase() ) != -1) );
    }
    return shows;
  }

  render() {
    const shows = this.getShows();
    return (
      <div>
        <input type="text" placeholder="Search" autoFocus={true} onChange={( event ) => this.search.setData( event.target.value )}/>
        {shows.map( show => {
          return <ShowComponent show={show} key={show.id}/>;
        } )}
        <SeriesDetailsComponent/>

      </div>
    );
  }
}