import * as React from 'react';
import './app.css';
import { DataManagerComponent } from './components/core/Data.manager.component';
import { Menu } from './components/menu/Menu.component';
import { WelcomeRoute } from "./routes/Welcome.route";
import { SeriesRoute } from "./routes/Series.route";
import { ConfigRoute } from "./routes/Config.route";
import { CalendarRoute } from "./routes/Calendar.route";
import { ChromeService } from "./shared/chrome.service";
import { Navigation, NavigationState } from "./shared/Navigation";
import { HistoryRoute } from "./routes/History.route";

export class App extends DataManagerComponent<NavigationState, {}> {
  navigation: Navigation = new Navigation();

  constructor( props: {}, context?: {} ) {
    super( props, context );
    this.navigation.setState( 'welcome' );
    const chrome = new ChromeService();
    chrome.getBadgeCountFromSonarr();
  }

  getData() {
    return this.navigation.getStateAndParams();
  }

  getActiveRoute() {
    switch ( this.state ? this.state.data.state : null ) {
      case 'series':
        return <SeriesRoute/>;

      case 'config':
        return <ConfigRoute/>;

      case 'calendar':
        return <CalendarRoute/>;

      case 'history':
        return <HistoryRoute/>;

      default:
        return <WelcomeRoute/>;
    }
  }

  getHeader() {
    if ( this.state && this.state.data && this.state.data.state != 'welcome' && this.state.data.state != 'config' ) {
      return (
          <div>
            <Menu activeRoute={this.state.data.state}/>
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
