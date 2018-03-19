import { SonarrSeasonModel } from './sonarr-season.model';
import { SonarrRatingModel } from './sonarr-rating.model';
import { SonarrImageModel } from './sonarr-image.model';

/**
 * Created by taren on 3-2-2017.
 */
export class SonarrSeriesModel {
  title: string;
  alternateTitles: {
    title: string;
    seasonNumber: number;
  }[];
  sortTitle: string;
  seasonCount: number;
  totalEpisodeCount: number;
  episodeCount: number;
  episodeFileCount: number;
  sizeOnDisk: number;
  status: string;
  overview: string;
  previousAiring: Date;
  network: string;
  airTime: string;
  images: SonarrImageModel[];
  seasons: SonarrSeasonModel[];
  year: number;
  path: string;
  profileId: number;
  seasonFolder: boolean;
  monitored: boolean;
  useSceneNumbering: boolean;
  runtime: number;
  tvdbId: number;
  tvRageId: number;
  tvMazeId: number;
  firstAired: Date;
  lastInfoSync: Date;
  seriesType: string;
  cleanTitle: string;
  imdbId: string;
  titleSlug: string;
  certification: string;
  genres: string[];
  tags: Object[];
  added: Date;
  ratings: SonarrRatingModel;
  qualityProfileId: number;
  id: number;
  nextAiring?: Date;

  constructor( obj: any ) {
    Object.assign( this, obj );

    this.previousAiring = new Date( this.previousAiring );
    this.firstAired     = new Date( this.firstAired );
    this.lastInfoSync   = new Date( this.lastInfoSync );
    this.added          = new Date( this.added );

  }
}
