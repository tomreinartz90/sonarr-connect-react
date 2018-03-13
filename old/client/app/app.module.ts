import { NgModule, ApplicationRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HomeComponent } from "../routes/home/home.component";
import { HistoryComponent } from "../routes/history/history.component";
import { SeriesComponent } from "../routes/series/series.component";
import { ConfigComponent } from "../routes/config/config.component";
import { StorageService, SonarrService } from "../shared/index";
import { routing } from "./app.routing";
import { SonarrUtil } from "../shared/sonarr.util";
import { EpisodeComponent } from "../components/episode/episode.component";
import { SeriesDetailsComponent } from "../routes/series/seriesdetails/series-details.component";
import { Showomponent } from "../components/show/show.component";
import { TimeAgoPipe } from "../pipes/time-ago.pipe";
import { CalendarComponent } from "../routes/calendar/calendar.component";
import { ChromeService } from "../shared/chrome.service";


@NgModule( {
  imports: [
    BrowserAnimationsModule,
    HttpModule,
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    SeriesComponent,
    HistoryComponent,
    ConfigComponent,
    SeriesDetailsComponent,
    EpisodeComponent,
    CalendarComponent,
    TimeAgoPipe,
    Showomponent
  ],
  providers: [
    StorageService,
    SonarrUtil,
    ChromeService,
    SonarrService
  ],
  bootstrap: [ AppComponent ]
} )
export class AppModule {
  constructor() {
  }

  // hmrOnInit(store) {
  //   console.log('HMR store', store);
  // }
  // hmrOnDestroy(store) {
  //   let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
  //   // recreate elements
  //   store.disposeOldHosts = createNewHosts(cmpLocation);
  //   // remove styles
  //   removeNgStyles();
  // }
  // hmrAfterDestroy(store) {
  //   // display new elements
  //   store.disposeOldHosts();
  //   delete store.disposeOldHosts;
  // }
}
