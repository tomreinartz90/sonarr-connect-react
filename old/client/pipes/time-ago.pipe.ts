/**
 * Created by taren on 8-2-2017.
 */
/* angular2-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import { ChangeDetectorRef, NgZone, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import moment from 'moment/moment';

// under systemjs, moment is actually exported as the default export, so we account for that
//const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

@Pipe( { name: 'timeAgo', pure: false } )
export class TimeAgoPipe implements PipeTransform, OnDestroy {
  private currentTimer: number;

  private lastTime: Number;
  private lastValue: Date | moment.Moment;
  private lastOmitSuffix: boolean;
  private lastText: string;

  constructor( private cdRef: ChangeDetectorRef, private ngZone: NgZone ) {
  }

  transform( value: Date | moment.Moment, omitSuffix?: boolean ): string {
    return "";
    if ( this.hasChanged( value, omitSuffix ) ) {
      this.lastTime       = this.getTime( value );
      this.lastValue      = value;
      this.lastOmitSuffix = omitSuffix;
      this.removeTimer();
      this.createTimer();
      this.lastText = moment( value ).from( moment(), omitSuffix );

    } else {
      this.createTimer();
    }

    return this.lastText;
  }

  ngOnDestroy(): void {
    this.removeTimer();
  }


  private createTimer() {
    if ( this.currentTimer ) {
      return;
    }
    const momentInstance = moment( this.lastValue );

    const timeToUpdate = this.getSecondsUntilUpdate( momentInstance ) * 1000;
    this.currentTimer  = this.ngZone.runOutsideAngular( () => {
      if ( typeof window !== 'undefined' ) {
        return window.setTimeout( () => {
          this.lastText = moment( this.lastValue ).from( moment(), this.lastOmitSuffix );

          this.currentTimer = null;
          this.ngZone.run( () => this.cdRef.markForCheck() );
        }, timeToUpdate );
      } else {
        return null;
      }
    } );
  }


  private removeTimer() {
    if ( this.currentTimer ) {
      window.clearTimeout( this.currentTimer );
      this.currentTimer = null;
    }
  }

  private getSecondsUntilUpdate( momentInstance: moment.Moment ) {
    const howOld = Math.abs( moment().diff( momentInstance, 'minute' ) );
    if ( howOld < 1 ) {
      return 1;
    } else if ( howOld < 60 ) {
      return 30;
    } else if ( howOld < 180 ) {
      return 300;
    } else {
      return 3600;
    }
  }

  private hasChanged( value: Date | moment.Moment, omitSuffix?: boolean ) {
    return this.getTime( value ) !== this.lastTime || omitSuffix !== this.lastOmitSuffix;
  }

  private getTime( value: Date | moment.Moment ) {
    if ( moment.isDate( value ) ) {
      return value.getTime();
    } else if ( moment.isMoment( value ) ) {
      return value.valueOf();
    } else {
      return moment( value ).valueOf();
    }
  }
}
