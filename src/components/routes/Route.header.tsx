import * as React from 'react';

export class RouteHeader extends React.Component<{ name: string }> {


  render() {
    return (
      <div className="route-header">
        <h4>{this.props.name}</h4>
      </div>
    );
  }
}
