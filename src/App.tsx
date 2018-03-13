import * as React from 'react';
import './App.css';
import { DataManagerComponent } from './components/core/Data.manager.component';
import { Menu } from './components/menu/Menu.component';
import { DataManager } from './shared/data.manager.service';
import { WelcomeRoute } from "./components/routes/Welcome.route";
import { SeriesRoute } from "./components/routes/Series.route";
import { ConfigRoute } from "./components/routes/Config.route";

const logo = require( './logo.svg' );

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

      default:
        return <WelcomeRoute/>;
    }
  }

  getHeader() {
    if ( this.state.data != 'welcome' && this.state.data != 'config' ) {
      return (
          <div>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo"/>
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <Menu/>
          </div>
      );
    }
    return null;
  }

  render() {
    return (
        <div className="App">
          {this.getHeader()}
          {this.getActiveRoute()}
        </div>
    );
  }
}
