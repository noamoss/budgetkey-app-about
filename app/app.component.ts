import {Component, Inject} from '@angular/core';

import * as showdown from 'showdown';
import { THEME_ID_TOKEN } from '../node_modules/budgetkey-ng2-components';

@Component({
  selector: 'my-app',
  template: ` 
      <budgetkey-container [showHeader]="true" [showSearchBar]="true">
        <div class='main'>
          <div class='md' [innerHtml]="md()"></div>
        </div>
      </budgetkey-container>
  `, styles: [
`
div.main {
  align-items: center;
  display: flex;
  flex-flow: column;
  width: 100%;
  border-top: solid 1px #2389FF;
  margin-top: -9px;
  padding-top: 50px;
}
div.md { max-width: 770px; width: 100%; }
::ng-deep h1 { color: #2389FF;	font-family: "Miriam Libre";	font-size: 36px;	font-weight: bold;	line-height: 47px; }
::ng-deep h2 { color: #2389FF;	font-family: "Miriam Libre";	font-size: 24px;	font-weight: 300;	line-height: 47px; }
::ng-deep h3 { color: #2389FF;	font-family: "Miriam Libre";	font-size: 20px;	font-weight: 300;	line-height: 47px; }
::ng-deep p { color: #3C4948;	font-family: "Abraham TRIAL";	font-size: 20px;	line-height: 26px; }
`
  ]
})
export class AppComponent {

  converter: showdown.Converter;

  private textData = {
    'budgetkey': require('./abouts/budgetkey.md'),
    'govbuy':    require('./abouts/govbuy.md'),
    'socialmap': require('./abouts/socialmap.md'),
  };

  constructor(@Inject(THEME_ID_TOKEN) private themeId: string) {
    this.converter = new showdown.Converter();
    console.log('TI', themeId, this.textData[themeId]);
  }

  md() {
    return this.converter.makeHtml(this.textData[this.themeId] || this.textData['budgetkey']);
  }
}
