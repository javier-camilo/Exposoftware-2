import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteRegistroComponent } from './estudiante-registro.component';

describe('EstudianteRegistroComponent', () => {
  let component: EstudianteRegistroComponent;
  let fixture: ComponentFixture<EstudianteRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudianteRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudianteRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
