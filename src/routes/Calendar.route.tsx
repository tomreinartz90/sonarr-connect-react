import * as React from 'react';
import { RouteHeader } from "./Route.header";
import { CalendarComponent } from "../components/calendar/Calendar.component";
import { WantedComponent } from "../components/wanted/wanted.component";

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
