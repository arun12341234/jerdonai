import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JerdonAIResponseViewerComponent } from './jerdon-airesponse-viewer.component';

describe('JerdonAIResponseViewerComponent', () => {
  let component: JerdonAIResponseViewerComponent;
  let fixture: ComponentFixture<JerdonAIResponseViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JerdonAIResponseViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JerdonAIResponseViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
