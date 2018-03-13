/**
 * Created by taren on 3-2-2017.
 */
export class SonarrRatingModel {
  votes: number;
  value: number;

  constructor( obj: Object ) {
    Object.assign( this, obj );
  }
}
