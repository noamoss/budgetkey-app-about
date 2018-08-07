import {Component, Inject, Pipe, PipeTransform} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

import * as showdown from 'showdown';
import { THEME_ID_TOKEN } from '../node_modules/budgetkey-ng2-components';


@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value: string) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}


@Component({
  selector: 'my-app',
  template: ` 
      <budgetkey-container [showHeader]="true" [showSearchBar]="true">
        <div class='main'>
           <div class='md' [innerHtml]="md()  | safeHtml"></div>
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
::ng-deep div.md h1 { color: #2389FF;	font-family: "Miriam Libre";	font-size: 36px;	font-weight: bold;	line-height: 47px; }
::ng-deep div.md h2 { color: #2389FF;	font-family: "Miriam Libre";	font-size: 24px;	font-weight: 300;	line-height: 47px; }
::ng-deep div.md h3 { color: #2389FF;	font-family: "Miriam Libre";	font-size: 20px;	font-weight: 300;	line-height: 47px; }
::ng-deep div.md h4 { color: #3C4948;	font-family: "Abraham TRIAL";	font-size: 20px;	line-height: 26px; text-align: center; }
::ng-deep div.md p { color: #3C4948;	font-family: "Abraham TRIAL";	font-size: 20px;	line-height: 26px; }
::ng-deep div.md li { color: #3C4948;	font-family: "Abraham TRIAL";	font-size: 18px;	line-height: 22px; }
`
  ]
})
export class AppComponent {

  converter: showdown.Converter;

  private textData = {
    'budgetkey': require('../abouts/budgetkey.md'),
    'govbuy':    require('../abouts/govbuy.md'),
    'socialmap': require('../abouts/socialmap.md'),
  };

  constructor(@Inject(THEME_ID_TOKEN) private themeId: string) {
    this.converter = new showdown.Converter({customizedHeaderId: true});
  }

  md() {
    let ret = this.converter.makeHtml(this.textData[this.themeId] || this.textData['budgetkey']);
    return ret;
  }
}
