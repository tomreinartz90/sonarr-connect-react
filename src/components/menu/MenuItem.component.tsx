import * as React from 'react';
import { Navigation } from "../../shared/Navigation";

export class MenuItem extends React.Component<{ route: string, icon: string, isActive: boolean }> {
  navigation: Navigation = new Navigation();

  setMenu( menu: string ) {
    this.navigation.setState( menu );
  }

  getIsActiveRoute() {
    if ( this.props && this.props.isActive ) {
      return 'active';
    }
    return '';
  }

  render() {
    return (
        <a className={this.getIsActiveRoute()} onClick={() => this.setMenu( this.props.route )}>
          <i className="material-icons">{this.props.icon}</i>
          <span>{this.props.route}</span>
        </a>
    );
  }
}