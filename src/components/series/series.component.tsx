import { DataManagerComponent } from "../core/Data.manager.component";
import { SonarrService } from "../../shared/sonarr.service";
import * as React from "react";
import { SonarrSeriesModel } from "../../shared/domain/sonarr-series.model";
import { ShowComponent } from "../show/show.component";

export class SeriesComponent extends DataManagerComponent<Array<SonarrSeriesModel>, {}> {

  sonarr: SonarrService = new SonarrService();

  getData() {
    return this.sonarr.getSeries();
  }

  onAfterUpdateData( data: Array<SonarrSeriesModel> ) {
    console.log( data );
    return super.onAfterUpdateData( data );
  }

  render() {
    const shows: Array<SonarrSeriesModel> = this.state ? this.state.data : [];
    return (
        <div>
          {shows.map( show => {
            return <ShowComponent show={show} key={show.id}/>
          } )}

        </div>
    );
  }
}