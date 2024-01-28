import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initially contain only 20 products', () => {
    component.getFilteredProducts({
      sort: 'Default',
      search: '',
      type: 'Any',
      minPrice: 0,
      maxPrice: 100,
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.products-container')?.children.length).toEqual(20);
  });

  it('should properly filter products based on search', () => {
    component.getFilteredProducts({
      sort: 'Default',
      search: '55',
      type: 'Any',
      minPrice: 0,
      maxPrice: 100,
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.products-container')?.children.length).toEqual(19);
  });

  it('should filter out all products', () => {
    component.getFilteredProducts({
      sort: 'Default',
      search: '50',
      type: 'Any',
      minPrice: 0,
      maxPrice: 0,
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.products-container')?.children.length).toEqual(0);
  });

  it('should contain only hardware products', () => {
    component.getFilteredProducts({
      sort: 'Default',
      search: '50',
      type: 'Hardware',
      minPrice: 0,
      maxPrice: 100,
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.products-container')?.children.length).toEqual(5);
  });

  it('should properly sort products', () => {
    component.getFilteredProducts({
      sort: 'Highest Price',
      search: '',
      type: 'Any',
      minPrice: 0,
      maxPrice: 100,
    });
    fixture.detectChanges();

    expect(component.products[0].price).toEqual('99.89');
  });
});
