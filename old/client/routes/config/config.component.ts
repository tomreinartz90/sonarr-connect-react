import {Component, OnInit} from "@angular/core";
import {StorageService, SonarrConfig, SonarrService} from "../../shared/index";
import {fadeInOut} from "../../shared/animation.util";
import {Router} from "@angular/router";

@Component( {
  selector: 'my-config',
  templateUrl: 'config.component.html',
  animations: [ fadeInOut ],
  host: { '[@fadeInOut]': '' }
} )
export class ConfigComponent implements OnInit {

  config: SonarrConfig;
  testStatus: {success?: boolean, error?: boolean, info?: any} = null;

  constructor( private storage: StorageService, private sonarrService: SonarrService, private router: Router ) {
    // Do stuff
  }

  ngOnInit() {
    this.getConfig();
  }

  getConfig() {
    this.config = this.storage.getSonarrConfig();
  }

  setConfig() {
    this.storage.setSonarrConfig( this.config );
    this.router.navigate( [ 'series' ] );
  }

  testConfig() {
    this.storage.setSonarrConfig( this.config );

    this.sonarrService.getSystemStatus().subscribe( resp => {
      console.log( resp );
      this.testStatus = { success: true, info: resp };
    }, err => {
      this.testStatus = { error: true };
    } )

  }

}
