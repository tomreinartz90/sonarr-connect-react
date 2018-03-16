import * as React from 'react';
import './app.css';
import { DataManagerComponent } from './components/core/Data.manager.component';
import { Menu } from './components/menu/Menu.component';
import { DataManager } from './shared/data.manager.service';
import { WelcomeRoute } from "./components/routes/Welcome.route";
import { SeriesRoute } from "./components/routes/Series.route";
import { ConfigRoute } from "./components/routes/Config.route";
import { WantedRoute } from "./components/routes/Wanted.route";
import { CalendarRoute } from "./components/routes/Calendar.route";

export class App extends DataManagerComponent<string, {}> {
  navigation: DataManager<string>;

  constructor( props: {}, context?: {} ) {
    super( props, context );
    this.data       = 'welcome';
    this.navigation = new DataManager<string>( 'navigation' );
  }

  getData() {
    return this.navigation.getData();
  }

  getActiveRoute() {
    switch ( this.state.data ) {
      case 'series':
        return <SeriesRoute/>;

      case 'config':
        return <ConfigRoute/>;

      case 'wanted':
        return <WantedRoute/>;

      case 'calendar':
        return <CalendarRoute/>;

      default:
        return <WelcomeRoute/>;
    }
  }

  getHeader() {
    if ( this.state.data != 'welcome' && this.state.data != 'config' ) {
      return (
          <div>
            <Menu activeRoute={this.state.data}/>
          </div>
      );
    }
    return null;
  }

  render() {
    return (
        <div className="App">
          {this.getHeader()}
          <main>
            {this.getActiveRoute()}
          </main>
        </div>
    );
  }
}
