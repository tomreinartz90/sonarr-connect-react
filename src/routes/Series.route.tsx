import * as React from 'react';
import { RouteHeader } from "./Route.header";
import { SeriesComponent } from "../components/series/series.component";

export class SeriesRoute extends React.Component {
  render() {
    return (
        <div className="series">
          <RouteHeader name="Series"/>
          <SeriesComponent/>
        </div>
    );
  }
}
