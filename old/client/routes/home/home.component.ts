import { Component, OnInit } from "@angular/core";
import { SonarrService } from "../../shared/sonarr.service";
import { fadeInOut } from "../../shared/animation.util";
import { ChromeService } from "../../shared/chrome.service";

@Component( {
  selector: 'my-home',
  templateUrl: 'home.component.html',
  animations: [ fadeInOut ],
  host: { '[@fadeInOut]': '' }
} )
export class HomeComponent implements OnInit {

  wanted: any;
  calendar: any;

  constructor( private sonarr: SonarrService, private chrome: ChromeService ) {
  }

  ngOnInit() {
    if ( !this.chrome.isBackgroundScript() ) {
      this.getWanted();
    }
  }

  getWanted() {
    this.sonarr.getWanted().subscribe( resp => {
      this.wanted = resp;
    } )
  }

}
