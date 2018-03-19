import * as React from 'react';
import { MenuItem } from "./MenuItem.component";

export class Menu extends React.Component<{ activeRoute: string }> {

  getIsActiveRoute( route: string ): boolean {
    return !!route && !!this.props && this.props.activeRoute == route;
  }

  render() {
    return (
        <header className="small-12">
          <nav>
            <div className="row">
              <MenuItem isActive={this.getIsActiveRoute( 'calendar' )} route='calendar' icon='date_range'/>
              <MenuItem isActive={this.getIsActiveRoute( 'series' )} route='series' icon='movie_filter'/>
              <MenuItem isActive={this.getIsActiveRoute( 'history' )} route='history' icon='history'/>
              <MenuItem isActive={this.getIsActiveRoute( 'config' )} route='config' icon='settings'/>
            </div>
          </nav>
        </header>

    );
  }
}