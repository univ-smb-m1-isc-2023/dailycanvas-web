import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChallengeComponent } from './create-challenge.component';

describe('CreateChallengeComponent', () => {
  let component: CreateChallengeComponent;
  let fixture: ComponentFixture<CreateChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateChallengeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
