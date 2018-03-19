import { StorageService } from "./storage.service";

export class SonarrUtil {
  private storage: StorageService = new StorageService();

  calculateEpisodeQuoteColor( episodeFileCount: number, totalEpisodeCount: number, monitored: boolean, status: string ) {
    let episodeQuote = {
      'continuing': 'label regular',
      'ended': 'label success',
      'missing-monitored': 'label alert',
      'missing-not-monitored': 'label warning'
    };

    let label = "";
    if ( episodeFileCount == totalEpisodeCount ) {
      if ( status == 'continuing' ) {
        label = episodeQuote['continuing'];
      } else {
        label = episodeQuote['ended'];
      }
    } else if ( monitored ) {
      label = episodeQuote['missing-monitored'];
    } else {
      label = episodeQuote['missing-not-monitored'];
    }

    return label;
  }

//format date to be used in api
//TODO improve
  formatDate( date: Date, positiveOffset: any ) {
    if ( positiveOffset != null ) {
      date.setDate( date.getDate() + parseInt( positiveOffset ) );
    }
    return (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate()));
  }

  getImageUrl( data: any ) {
    if ( typeof data == "object" ) {
      let start = data.url.indexOf( 'MediaCover' );
      return this.storage.getSonarrConfig().url + "api/" + data.url.substring( start ) + "&apikey=" + this.storage.getSonarrConfig().apiKey;
    } else {
      return "";
    }
  }

//format episodenumbers to match scene formatting
  formatEpisodeNumer = function ( seasonNumber: number, episodeNumber: number ) {
    return "S" + (seasonNumber.toString().length === 1 ? '0' : '') + seasonNumber + "E" + (episodeNumber.toString().length === 1 ? '0' : '') + episodeNumber;
  };

//comparator to sort seasons by seasonNumber
  seasonComparator( a: any, b: any ) {
    if ( a.seasonNumber < b.seasonNumber ) {
      return -1;
    } else if ( a.seasonNumber > b.seasonNumber ) {
      return 1;
    }
    return 0;
  }

// comparator to sort seasons by seasonNumber
  seriesComparator( a: any, b: any ) {
    if ( a.status != b.status ) {
      if ( a.status < b.status ) {
        return -1;
      }
      if ( a.status > b.status ) {
        return 1;
      }
      return 0;
    }
    if ( a.sortTitle < b.sortTitle ) {
      return -1;
    }
    if ( a.sortTitle > b.sortTitle ) {
      return 1;
    }
    return 0;
  }

  isDataDayTheSame( date1: Date, date2: Date ) {
    return date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear();
  }
}
