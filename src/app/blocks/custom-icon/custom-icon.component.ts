import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import * as icons from './icon-groups';

export type IconsType = 'small' | 'normal' | 'large';

@Component({
  selector: 'df-custom-icon',
  styleUrls: ['./custom-icon.component.scss'],
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CustomIconComponent implements OnChanges {

  @Input() iconName: icons.Icon = 'logoIcon';
  @Input() type: IconsType = 'normal';
  @Input() inheritPathColor = false;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) { }

  @HostBinding('class') get class() {
    return `df-icon-container-${this.type} ${
      this.inheritPathColor ? 'inherit-color' : ''
    }`;
  }

  ngOnChanges(): void {
    const element = this.elementRef.nativeElement;
    element.innerHTML = '';

    const parser = new DOMParser();
    const svg = parser.parseFromString(icons[this.iconName], 'image/svg+xml');

    this.renderer.addClass(svg.documentElement, 'inherit-size');
    this.renderer.appendChild(element, svg.documentElement);
  }
}
