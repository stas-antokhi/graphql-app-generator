import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphqlDescriptorComponent } from './graphql-descriptor.component';

describe('GraphqlDescriptorComponent', () => {
  let component: GraphqlDescriptorComponent;
  let fixture: ComponentFixture<GraphqlDescriptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphqlDescriptorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphqlDescriptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
