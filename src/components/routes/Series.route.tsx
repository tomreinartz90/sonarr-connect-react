import * as React from 'react';
import { RouteHeader } from "./Route.header";
import { SeriesComponent } from "../series/series.component";

export class SeriesRoute extends React.Component {
  render() {
    return (
        <div>
          <RouteHeader name="Series"/>
          my series
          <SeriesComponent/>
        </div>
    );
  }
}
