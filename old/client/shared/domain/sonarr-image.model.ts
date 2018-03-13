/**
 * Created by taren on 3-2-2017.
 */
export class SonarrImageModel {
  coverType: string;
  url: string;

  constructor(obj:any){
    Object.assign(this, obj)
  }
}
