import { Component } from '@angular/core';
import { ChromeService } from "../shared/chrome.service";


@Component( {
  selector: 'my-app', // <my-app></my-app>
  templateUrl: 'app.component.html',
} )
export class AppComponent {

  constructor( chrome: ChromeService ) {
    chrome.setBadge( 0 );
  }
}
