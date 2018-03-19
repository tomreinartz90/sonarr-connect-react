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
import { ChromeService } from "./shared/chrome.service";

export class App extends DataManagerComponent<any[], {}> {
  navigation: DataManager<any[]>;

  constructor( props: {}, context?: {} ) {
    super( props, context );
    this.data       = ['welcome'];
    this.navigation = new DataManager<any[]>( 'navigation' );
    const chrome    = new ChromeService();
    chrome.getBadgeCountFromSonarr();
  }

  getData() {
    return this.navigation.getData();
  }

  getActiveRoute() {
    switch ( this.state.data[0] ) {
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
    if ( this.state.data[0] != 'welcome' && this.state.data[0] != 'config' ) {
      return (
          <div>
            <Menu activeRoute={this.state.data[0]}/>
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
