let stores: any = {};
import { ReplaySubject, Observable } from 'rxjs/Rx';

/**
 * a simple class that helps setup simple stores to handle states in the application
 */
export class DataManager<T> {

  static getStores() {
    return Object.keys( stores );
  }

  constructor( private key: string, defaultData?: T ) {
    if ( !(key in stores) ) {
      stores[key] = new ReplaySubject( 1 );
    }

    if ( defaultData ) {
      this.setData( defaultData );
    }
  }

  getData(): Observable<T> {
    return stores[this.key];
  }

  setData( data: T ) {
    stores[this.key].next( data );
  }
}