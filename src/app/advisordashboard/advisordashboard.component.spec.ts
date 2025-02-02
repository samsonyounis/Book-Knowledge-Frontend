import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisordashboardComponent } from './advisordashboard.component';

describe('AdvisordashboardComponent', () => {
  let component: AdvisordashboardComponent;
  let fixture: ComponentFixture<AdvisordashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvisordashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvisordashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
