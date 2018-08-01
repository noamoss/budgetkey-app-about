import 'karma-test-shim';

import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BudgetKeyCommonModule, THEME_ID_TOKEN } from 'budgetkey-ng2-components';
import { AppComponent } from './app.component';

describe('AppComponent', function () {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      imports: [
        HttpModule,
        FormsModule,
        BudgetKeyCommonModule,
      ],
      declarations: [
        AppComponent,
      ],
      providers: [
        {provide: THEME_ID_TOKEN, useValue: null}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
  });

  it('should create component', () => expect(comp).toBeDefined() );

  it('should render some charts', () => {
    fixture.detectChanges();
    expect(By.css('.category svg').length).toBeGreaterThan(0);
  });
});
