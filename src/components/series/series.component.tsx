import { DataManagerComponent } from "../core/Data.manager.component";
import { SonarrService } from "../../shared/sonarr.service";
import * as React from "react";
import { SonarrSeriesModel } from "../../shared/domain/sonarr-series.model";

export class SeriesComponent extends DataManagerComponent<Array<SonarrSeriesModel>, {}> {

  sonarr: SonarrService = new SonarrService();

  getData() {
    return this.sonarr.getSeries();
  }

  render() {
    return (
        <p>{this.state ? this.state.data : null}</p>
    );
  }
}