import { SonarrSeriesModel } from "./sonarr-series.model";

/**
 * Created by taren on 3-2-2017.
 */
export class SonarrSeriesEpisode {
  seriesId: number;
  episodeFileId: number;
  seasonNumber: number;
  episodeNumber: number;
  title: string;
  airDate: string;
  airDateUtc: Date;
  overview: string;
  hasFile: boolean;
  monitored: boolean;
  unverifiedSceneNumbering: boolean;
  id: number;
  episodeFile: Object;
  absoluteEpisodeNumber?: number;

  series: SonarrSeriesModel = new SonarrSeriesModel( {} );

  constructor( obj: Object ) {
    Object.assign( this, obj );
    this.airDateUtc = new Date( this.airDateUtc );
  }
}
