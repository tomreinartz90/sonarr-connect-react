import * as React from 'react';
import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";

export abstract class DataManagerComponent<D, P = {}, T = {}> extends React.Component<P, { data: D } & T> {

  subscriptions: Array<Subscription> = [];
  protected data$: Subscription;
  private mounted: boolean = false;


  constructor( props: P, context?: {} ) {
    super( props, context );
  }

  abstract getData(): Observable<D>;


  // alter data before it is stored in the current state
  onBeforeUpdateData( data: D ): D {
    return data;
  }

  onAfterUpdateData( data: D ): void {
    return;
  }

  onDataComplete() {
    return;
  }

  onDataError( error: any ) {
    console.log( error );
  }

  set data( data: D ) {
    const modifiedData: D = this.onBeforeUpdateData( data );
    const state = Object.assign( this.state || {}, { data: modifiedData } );

    if ( this.mounted ) {
      this.setState( state );
    } else {
      this.state = state;
    }

    this.onAfterUpdateData( modifiedData );
  }

  get data() {
    return this.state.data;
  }

  componentDidMount() {
    this.mounted = true;
    this.listenToData();
  }

  componentWillUnmount() {
    if ( this.data$ ) {
      this.data$.unsubscribe();
    }

    if ( this.subscriptions && this.subscriptions.length ) {
      this.subscriptions.forEach( sub => sub.unsubscribe() );
    }
  }

  protected listenToData() {
    if ( this.data$ ) {
      this.data$.unsubscribe();
    }

    this.data$ = this.getData().distinctUntilChanged( ( previous: any, current: any ) => {
      // reduce the amount of state updates when the value of data has not changed we will not emit its value.
      return JSON.stringify( previous ) == JSON.stringify( current );
    } ).subscribe( data => {
        this.setState( { data: data } );
      },
      error => this.onDataError( error ),
      () => this.onDataComplete() );
  }

}