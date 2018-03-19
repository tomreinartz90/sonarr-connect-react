import * as React from 'react';
import { RouteHeader } from "./Route.header";
import { WantedComponent } from "../wanted/wanted.component";

export class WantedRoute extends React.Component {
  render() {
    return (
        <div className="wanted">
          <RouteHeader name="Wanted"/>
          <WantedComponent/>
        </div>
    );
  }
}
