import * as React from 'react';
import { SonarrUtil } from "../../shared/sonarr.util";
import { SonarrSeriesEpisode } from "../../shared/domain/sonarr-series-episode.model";

export class EpisodeComponent extends React.Component<{ episode: SonarrSeriesEpisode, enthusiasmLevel?: number }> {
  private util: SonarrUtil = new SonarrUtil();

  render() {
    const episode: SonarrSeriesEpisode = this.props.episode || new SonarrSeriesEpisode( {} );
    return (
        <div className="episode">
          <div className="row expanded">
            <div className="small-10 columns episode-info">
              <a className="series-title">{episode.series.title}</a>
              <div className="episode-title">
                <span className="episodenum">{this.util.formatEpisodeNumer( episode.seasonNumber, episode.episodeNumber )}&nbsp;</span>
                <span className="episodename">{episode.title}</span>
              </div>
              <div className="episode-info">
                episode-info
              </div>
            </div>
            <div className="small-2 columns monitored-indicator">
              <i className="material-icons">{episode.monitored ? 'bookmark' : 'bookmark_border'}</i>
            </div>
          </div>
        </div>


    );
  }
}
