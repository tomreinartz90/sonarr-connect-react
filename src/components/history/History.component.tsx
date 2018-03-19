import { DataManagerComponent } from "../core/Data.manager.component";
import { SonarrService } from "../../shared/sonarr.service";
import * as React from "react";
import { EpisodeComponent } from "../episode/episode.component";
import { SonarrHistoryItemModel } from "../../shared/domain/sonarr-history-item.model";

export class HistoryComponent extends DataManagerComponent<Array<SonarrHistoryItemModel>, {}> {

  sonarr: SonarrService = new SonarrService();

  private events: any = {
    "downloadFolderImported": 'Imported',
    "grabbed": 'Grabbed',
    "episodeFileDeleted": 'Deleted',
    "hide": '',
    "downloaded": "downloaded",
    "missing": 'Missing ',
    "toBeAired": '',
    "downloadFailed": 'Failed'
  };

  private classes: any = {
    "downloadFolderImported": 'label success',
    "downloaded": 'label success',
    "grabbed": 'label secondary',
    "episodeFileDeleted": 'label alert',
    "hide": 'hide',
    "missing": 'label secondary',
    "toBeAired": 'tba',
    "downloadFailed": 'label alert'
  };

  getData() {
    return this.sonarr.getHistory();
  }

  getEpisodeInfo( history: SonarrHistoryItemModel ) {
    return (
      <div className="episode-info ">
        <span className="label secondary">{history.quality.quality.name}</span>&nbsp;
        <span className={this.classes[history.eventType]}>{this.events[history.eventType]}</span>&nbsp;
        <span className="date">{history.date.toLocaleDateString()}</span>
      </div>
    );
  }

  render() {
    const episodes: Array<SonarrHistoryItemModel> = this.state ? this.state.data : [];
    return episodes.map( episode => (
        <div key={episode.id}>
          <EpisodeComponent episode={episode.episode} episodeInfo={this.getEpisodeInfo( episode )}>
            {this.getEpisodeInfo( episode )}
          </EpisodeComponent>
        </div>
      )
    );
  }
}