import * as React from "react";
import { ShowComponent } from "../show/show.component";
import { SeriesDetailsComponent } from "../series-details/series-details.component";
import { SonarrSeriesState } from "../../reducers/series.reducer";
import { Store } from "redux";
import { initList, searchShow } from "../../reducers/series.actions";

export class SeriesComponent extends React.Component<{ store?: Store, series?: SonarrSeriesState, }, { showList: boolean, searchQuery: string }> {

  constructor( a: any, b: any ) {
    super( a, b );
    this.dispatch = this.dispatch.bind( this );
  }

  componentDidMount() {
    initList( this.dispatch )
  }

  dispatch( arg: any ) {
    if ( this.props.store ) {
      return this.props.store.dispatch( arg )
    }
    return () => () => {
      return console.error( 'Dispatch not available' )
    }
  }

  render() {
    const shows = this.props.series ? this.props.series.filteredShows : [];
    return (
        <div>
          <input type="text" placeholder="Search" autoFocus={true} onChange={( event ) => this.dispatch( searchShow( event.target.value ) )}/>
          {shows.map( show => {
            return <ShowComponent show={show} key={show.id}/>;
          } )}
          <SeriesDetailsComponent/>

        </div>
    );
  }
}