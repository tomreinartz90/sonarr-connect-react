/**
 * Created by taren on 3-2-2017.
 */
export class SonarrSeriesStatisticsModel {
  episodeFileCount: number;
  episodeCount: number;
  totalEpisodeCount: number;
  sizeOnDisk: number;
  percentOfEpisodes: number;
  previousAiring?: Date;
  nextAiring?: Date;

  constructor( obj: Object ) {
    Object.assign( this, obj );
    this.previousAiring = new Date( String( this.previousAiring ) );
    this.nextAiring     = new Date( String( this.nextAiring ) );
  }
}
