import { Component, OnInit } from "@angular/core";
import { SonarrService } from "../../shared/sonarr.service";
import { fadeInOut } from "../../shared/animation.util";
import groupBy from "lodash/groupBy";
import sortBy from "lodash/sortBy";

@Component( {
  selector: 'my-history',
  templateUrl: 'history.component.html',
  animations: [ fadeInOut ],
  host: { '[@fadeInOut]': '' }
} )
export class HistoryComponent implements OnInit {

  history: Array<Array<any>>;

  constructor( private sonarr: SonarrService ) {
  }

  ngOnInit() {
    this.getWanted();
  }

  getWanted() {
    this.sonarr.getHistory().subscribe( resp => {
      let data     = groupBy( resp, 'episodeId' );
      this.history = Object.keys( data ).map( ( key: string ) => {
        return data[ key ];
      } );
      this.history = this.history.map( set => sortBy( set, 'id' ) );
//      this.history = reverse( sortBy( this.history, ( set ) => set[ 0 ].id ) );
    } );
  }

  getIconFromEvent( eventType: string ) {
    switch ( eventType ) {
      case 'downloadFolderImported':
        return 'assignment_returned';
      case "episodeFileDeleted":
        return 'delete';
      case "grabbed":
        return 'assignment';
      default:
        return 'assignment_late'
    }
  }

  getNameFromEvent( eventType: string ) {
    switch ( eventType ) {
      case 'downloadFolderImported':
        return 'imported';
      case "episodeFileDeleted":
        return 'deleted';
      case "grabbed":
        return 'grabbed';
      default:
        return eventType
    }
  }

}
