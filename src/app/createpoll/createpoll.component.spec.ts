import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepollComponent } from './createpoll.component';

describe('CreatepollComponent', () => {
  let component: CreatepollComponent;
  let fixture: ComponentFixture<CreatepollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatepollComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatepollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
