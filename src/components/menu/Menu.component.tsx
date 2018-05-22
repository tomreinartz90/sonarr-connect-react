import * as React from 'react';
import { MenuItem } from "./MenuItem.component";

export class Menu extends React.Component<{}> {

  render() {
    return (
        <header className="small-12">
          <nav>
            <div className="row">
              <MenuItem route='calendar' icon='date_range'/>
              <MenuItem route='series' icon='movie_filter'/>
              <MenuItem route='history' icon='history'/>
              <MenuItem route='config' icon='settings'/>
            </div>
          </nav>
        </header>
    );
  }
}