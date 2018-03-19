import * as React from 'react';
import { DataManager } from '../../shared/data.manager.service';

export class Menu extends React.Component<{ activeRoute: string }> {
  navigation: DataManager<any[]> = new DataManager<any[]>( 'navigation' );

  setMenu( menu: string ) {
    this.navigation.setData( [menu] );
  }

  getIsActiveRoute( route: string ) {
    if ( route && this.props && this.props.activeRoute == route ) {
      return 'active';
    }
    return '';
  }

  render() {
    return (
      <header className="small-12">
        <nav>
          <div className="row">
            <a className={this.getIsActiveRoute( 'wanted' )} onClick={() => this.setMenu( 'wanted' )}>
              <i className="material-icons">local_movies</i>
              <span>Wanted</span>
            </a>
            <a className={this.getIsActiveRoute( 'calendar' )} onClick={() => this.setMenu( 'calendar' )}>
              <i className="material-icons">date_range</i>
              <span>Calendar</span>
            </a>
            <a className={this.getIsActiveRoute( 'series' )} onClick={() => this.setMenu( 'series' )}>
              <i className="material-icons">movie_filter</i>
              <span>Series</span>
            </a>
            {/*              <a className={this.getIsActiveRoute( 'history' )} onClick={() => this.setMenu( 'history' )}>
             <i className="material-icons">history</i>
             <span>History</span>
             </a>*/}
            <a className={this.getIsActiveRoute( 'config' )} onClick={() => this.setMenu( 'config' )}>
              <i className="material-icons">settings</i>
              <span>Config</span>
            </a>
          </div>
        </nav>
      </header>

    );
  }
}