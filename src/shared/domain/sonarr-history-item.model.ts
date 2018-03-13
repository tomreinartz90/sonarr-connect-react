import { SonarrSeriesEpisode } from './sonarr-series-episode.model';
import { SonarrSeriesModel } from './sonarr-series.model';

/**
 * @Author Reinartz.T
 * <<Explain class>> ${}
 */
export class SonarrHistoryItemModel {
  episodeId: number;
  seriesId: number;
  sourceTitle: string;
  quality: { quality: { id: number, name: string }; revision: { real: number, version: number }; };
  qualityCutoffNotMet: boolean;
  date: Date;
  downloadId: string;
  eventType: string;
  data: Object;
  episode: SonarrSeriesEpisode;
  series: SonarrSeriesModel;
  id: number;

  constructor( data: Object ) {
    Object.assign( this, data );
    this.date = new Date( this.date );
  }
}