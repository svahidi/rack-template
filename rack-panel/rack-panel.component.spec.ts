import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RackPanelComponent } from './rack-panel.component';

describe('RackPanelComponent', () => {
  let component: RackPanelComponent;
  let fixture: ComponentFixture<RackPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RackPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RackPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
