import { SonarrSeriesStatisticsModel } from './sonarr-series-statistics.model';

/**
 * Created by taren on 3-2-2017.
 */
export class SonarrSeasonModel {
  seasonNumber: number;
  monitored: boolean;
  statistics: SonarrSeriesStatisticsModel;

  constructor( obj: Object ) {
    Object.assign( this, obj );
  }
}
