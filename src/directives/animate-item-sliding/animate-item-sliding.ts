import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[animateItemSliding]'
})
export class AnimateItemSliding implements OnInit {
  @Input('animateItemSliding') shouldAnimate: boolean;

  constructor(public element: ElementRef,
              public renderer: Renderer2) {
  }

  ngOnInit() {
    if (this.shouldAnimate) {
      this.renderer.addClass(this.element.nativeElement, 'active-slide');
      this.renderer.addClass(this.element.nativeElement, 'active-options-right');
      // Wait to apply animation
      setTimeout(() => {
        this.renderer.addClass(this.element.nativeElement.firstElementChild, 'itemSlidingAnimation');
        // disables after first animation
        setTimeout(() => {
          this.renderer.removeClass(this.element.nativeElement, 'active-slide');
          this.renderer.removeClass(this.element.nativeElement, 'active-options-right');
          this.renderer.removeClass(this.element.nativeElement.firstElementChild, 'itemSlidingAnimation');
        }, 1000);
      }, 500);
    }
  }
}
