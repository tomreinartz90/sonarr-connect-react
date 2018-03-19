import * as React from 'react';
import { RouteHeader } from "./Route.header";
import { CalendarComponent } from "../calendar/Calendar.component";
import { WantedComponent } from "../wanted/wanted.component";

export class CalendarRoute extends React.Component {
  render() {
    return (
        <div className="calendar">
          <RouteHeader name="Calendar"/>
          <WantedComponent/>
          <CalendarComponent/>
        </div>
    );
  }
}
