import * as React from 'react';
import { RouteHeader } from "./Route.header";
import { SeriesComponent } from "../components/series/series.component";
import { SonarrSeriesState } from "../reducers/series.reducer";
import { Store } from "redux";

export class SeriesRoute extends React.Component<{ store?: Store, series?: SonarrSeriesState, }> {
  render() {
    return (
        <div className="series">
          <RouteHeader name="Series"/>
          <SeriesComponent store={this.props.store} series={this.props.series}/>
        </div>
    );
  }
}
