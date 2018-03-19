import * as React from 'react';
import { SonarrUtil } from "../../shared/sonarr.util";
import { SonarrSeriesEpisode } from "../../shared/domain/sonarr-series-episode.model";
import { Navigation } from "../../shared/Navigation";

export class EpisodeComponent extends React.Component<{ episode: SonarrSeriesEpisode, episodeInfo?: JSX.Element }> {
  private util: SonarrUtil = new SonarrUtil();
  private navigation: Navigation = new Navigation();

  getSeriesTitle( episode: SonarrSeriesEpisode ) {
    if ( episode.series ) {
      return (
        <a className="series-title"
           onClick={() => this.navigation.setState( 'series', ['showId', episode.series.id] )}>{episode.series.title}</a>
      );
    }
    return null;
  }


  isAirdateBeforeNow() {
    return (this.props && this.props.episode && this.props.episode.airDateUtc && new Date( this.props.episode.airDateUtc ).toISOString() < new Date().toISOString());
  }

  getInfo( episode: SonarrSeriesEpisode ) {
    if ( !this.props.children ) {
      return (
        <div className="episode-info">
          {!episode.hasFile ? <span className="label secondary">Missing</span> :
            <span className="label success">Downloaded</span>}
          &nbsp;<span
          className="date">{this.isAirdateBeforeNow() ? 'Aired' : 'Airs'} {episode.airDateUtc.toLocaleDateString()}</span>
        </div>
      );
    }
    return this.props.children;
  }

  render() {
    const episode: SonarrSeriesEpisode = this.props.episode || new SonarrSeriesEpisode( {} );
    return (
      <div className="episode">
        <div className="row expanded">
          <div className="small-10 columns episode-info">
            {this.getSeriesTitle( episode )}
            <div className="episode-title">
              <span
                className="episodenum">{this.util.formatEpisodeNumer( episode.seasonNumber, episode.episodeNumber )}&nbsp;</span>
              <span className="episodename">{episode.title}</span>
            </div>
            {this.getInfo( episode )}
          </div>
          <div className="small-2 columns monitored-indicator">
            <i className="material-icons">{episode.monitored ? 'bookmark' : 'bookmark_border'}</i>
          </div>
        </div>
      </div>


    );
  }
}
