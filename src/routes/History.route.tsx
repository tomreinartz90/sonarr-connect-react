import * as React from "react";
import { RouteHeader } from "./Route.header";
import { HistoryComponent } from "../components/history/History.component";

export class HistoryRoute extends React.Component {
  render() {
    return (
        <div className="history">
          <RouteHeader name="history"/>
          <HistoryComponent/>
        </div>
    );
  }
}
