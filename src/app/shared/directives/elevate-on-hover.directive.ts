import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[elevateOnHover]'
})
export class ElevateOnHoverDirective {

  private isHovering: boolean = false;

  @HostBinding('class.mat-elevation-z8') get applyElevation() {
    return this.isHovering;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.isHovering = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isHovering = false;
  }

}
