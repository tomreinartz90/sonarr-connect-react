import * as React from "react";
import { SonarrSeriesModel } from "../../shared/domain/sonarr-series.model";
import { SonarrService } from "../../shared/sonarr.service";
import { SonarrUtil } from "../../shared/sonarr.util";
import { Navigation } from "../../shared/Navigation";

export class ShowComponent extends React.Component<{ show: SonarrSeriesModel, enthusiasmLevel?: number }> {
  private sonarr: SonarrService = new SonarrService();
  private navigation: Navigation = new Navigation();
  private util: SonarrUtil = new SonarrUtil();

  getPoster( show: SonarrSeriesModel ) {
    return this.sonarr.getSeriesUrl( show, "poster" );
  }

  getEpisodeLabelClass( show: SonarrSeriesModel ) {
    if ( show ) {
      return this.util.calculateEpisodeQuoteColor( show.episodeFileCount, show.episodeCount, show.monitored, show.status );
    }
    return '';
  }

  render() {
    const show: SonarrSeriesModel = this.props.show || new SonarrSeriesModel( {} );
    return (
      <div className="serie-general row is-collapse-child"
           onClick={() => this.navigation.setState( 'series', ['showId', show.id] )}>

        <div className="small-8 columns">
          <h3 id="title" className="series-title">{show.title}</h3>
          <span id="network" className="label secondary">{show.network}</span>&nbsp;
          <span id="episodesCount"
                className={this.getEpisodeLabelClass( show )}>{show.episodeCount}/{show.episodeFileCount}</span>&nbsp;
          <span id="status" className="label success">{show.status}</span>
        </div>
        <div className="small-2 columns monitored-indicator">
          <i className="material-icons">{show.monitored ? 'bookmark' : 'bookmark_border'}</i>
        </div>
        <div className="small-2">
          <img id="poster" src={this.getPoster( show )}/>
        </div>
      </div>

    );
  }
}
