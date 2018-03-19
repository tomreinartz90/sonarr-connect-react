import { DataManager } from "./data.manager.service";

export type NavigationState = { state: string, params: Map<string, any> };

export class Navigation {
  private data: DataManager<NavigationState> = new DataManager<NavigationState>( 'navigation' );

  setState( state: string, params: Map<string, any> = new Map() ) {
    this.data.setData( { state, params: params } );
  }

  getState() {
    return this.data.getData().map( data => data.state );
  }

  getStateAndParams() {
    return this.data.getData();
  }

  getParams() {
    return this.data.getData().map( ( data: NavigationState ) => data.params );
  }

  addParam( key: string, value: any ) {
    this.data.getData().map( routerState => {
      routerState.params.set( key, value );
      return this.data.setData( routerState );
    } )
  }

  deleteParam( key: string ) {
    this.data.getData().map( routerState => {
      routerState.params.delete( key );
      return this.data.setData( routerState );
    } )
  }

}