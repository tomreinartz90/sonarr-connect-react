import * as React from "react";
import "./app.css";
import { Menu } from "./components/menu/Menu.component";
import { WelcomeRoute } from "./components/routes/Welcome.route";
import { SeriesRoute } from "./components/routes/Series.route";
import { ConfigRoute } from "./components/routes/Config.route";
import { CalendarRoute } from "./components/routes/Calendar.route";
import { ChromeService } from "./shared/chrome.service";
import { HistoryRoute } from "./components/routes/History.route";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { SonarrConfig } from "./shared/domain/sonar.config.model";
import { SonarrSeriesEpisode } from "./shared/domain/sonarr-series-episode.model";
import { SonarrSeriesModel } from "./shared/domain/sonarr-series.model";
import { SonarrHistoryItemModel } from "./shared/domain/sonarr-history-item.model";
import { createStore } from 'redux'


type SonarrAppState = {
  config: SonarrConfig,
  calendar: Array<{ date: Date, episodes: Array<SonarrSeriesEpisode> }>,
  wanted: Array<SonarrSeriesEpisode>,
  series: Array<SonarrSeriesModel>,
  history: Array<SonarrHistoryItemModel>
}


export class App extends React.Component<{}, SonarrAppState> {

  constructor( props: {}, context?: {} ) {
    super( props, context );
    const chrome = new ChromeService();
    chrome.getBadgeCountFromSonarr();
    this.setInitialState();
  }

  setInitialState() {
    this.state = {
      config: new SonarrConfig(),
      calendar: [],
      wanted: [],
      history: [],
      series: []
    };
  }


  render() {
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
            <Route path="/series" component={() => <SeriesRoute/>}/>
          </main>
        </div>
      </Router>
    );
  }
}
