import * as React from 'react';
import { RouteHeader } from "./Route.header";
import { CalendarComponent } from "../calendar/Calendar.component";

export class CalendarRoute extends React.Component {
  render() {
    return (
        <div>
          <RouteHeader name="Calendar"/>
          <CalendarComponent/>
        </div>
    );
  }
}
