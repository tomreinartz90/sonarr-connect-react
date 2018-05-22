import * as React from 'react';
import './app.css';

import { Menu } from './components/menu/Menu.component';
import { WelcomeRoute } from "./routes/Welcome.route";
import { SeriesRoute } from "./routes/Series.route";
import { ConfigRoute } from "./routes/Config.route";
import { CalendarRoute } from "./routes/Calendar.route";
import { ChromeService } from "./shared/chrome.service";
import { HistoryRoute } from "./routes/History.route";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { SonarrConfig } from "./shared/domain/sonar.config.model";
import { SonarrSeriesEpisode } from "./shared/domain/sonarr-series-episode.model";
import { SonarrHistoryItemModel } from "./shared/domain/sonarr-history-item.model";
import { SonarrSeriesState } from "./reducers/series.reducer";
import { Store } from "redux";


type SonarrAppState = {
  config: SonarrConfig,
  calendar: Array<{ date: Date, episodes: Array<SonarrSeriesEpisode> }>,
  wanted: Array<SonarrSeriesEpisode>,
  series: SonarrSeriesState,
  history: Array<SonarrHistoryItemModel>
}

export class App extends React.Component<{ store?: Store }, SonarrAppState> {

  constructor( props: {}, context?: {} ) {
    super( props, context );
    const chrome = new ChromeService();

    chrome.getBadgeCountFromSonarr();
    this.setInitialState();


    if ( this.props.store ) {
      const store = this.props.store;
      store.subscribe( () => {
            if ( this.state != store.getState() ) {
              console.log( this.state, store.getState() );
              this.setState( store.getState() )
            }
          }
      );
    }
  }

  setInitialState() {
    this.state = {
      config: new SonarrConfig(),
      calendar: [],
      wanted: [],
      history: [],
      series: { shows: [], filteredShows: [], searchQuery: "" }
    };
  }

  getState() {
    if ( this.props.store ) {
      return this.props.store.getState();
    } else {
      return {};
    }
  }


  render() {
    console.log( this );
    return (
        <Router>
          <div className="App">
            <Menu/>
            <main>
              {/*{this.getActiveRoute()}*/}
              <Route exact={true} path="/" component={() => <WelcomeRoute/>}/>
              <Route path="/calendar" component={() => <CalendarRoute wanted={this.state.wanted} calendar={this.state.calendar}/>}/>
              <Route path="/history" component={() => <HistoryRoute/>}/>
              <Route path="/config" component={() => <ConfigRoute/>}/>
              <Route path="/series" component={() => <SeriesRoute store={this.props.store} series={this.state.series}/>}/>
            </main>
          </div>
        </Router>
    );
  }
}
