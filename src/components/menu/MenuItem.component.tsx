import * as React from 'react';
import { Link } from "react-router-dom";

export class MenuItem extends React.Component<{ route: string, icon: string }> {
  render() {

    return (
        <Link to={this.props.route}>
          <i className="material-icons">{this.props.icon}</i>
          <span>{this.props.route}</span>
        </Link>
    );
  }
}
