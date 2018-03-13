/**
 * Created by taren on 3-2-2017.
 */
export class SonarrSeriesStatisticsModel {
  episodeFileCount: number;
  episodeCount: number;
  totalEpisodeCount: number;
  sizeOnDisk: any;
  percentOfEpisodes: number;
  previousAiring?: Date;
  nextAiring?: Date;

  constructor(obj:Object){
    Object.assign(this, obj);
    this.previousAiring = new Date(this.previousAiring);
    this.nextAiring = new Date(this.nextAiring);
  }
}
