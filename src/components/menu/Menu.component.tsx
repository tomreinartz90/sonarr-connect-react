import * as React from 'react';
import { DataManager } from '../../shared/data.manager.service';

export class Menu extends React.Component {
  navigation: DataManager<string> = new DataManager<string>( 'navigation' );

  setMenu( menu: string ) {
    this.navigation.setData( menu );
  }

  render() {
    return (
        <ul>
          <li onClick={() => this.setMenu( 'series' )}>Series</li>
          <li onClick={() => this.setMenu( 'calendar' )}>Calendar</li>
          <li onClick={() => this.setMenu( 'wanted' )}>Wanted</li>
          <li onClick={() => this.setMenu( 'config' )}>Settings</li>
        </ul>);
  }
}