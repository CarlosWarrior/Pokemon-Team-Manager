import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[activeLink]'
})
export class ActiveDirective {
  @Input('activeLink')
  pathname:string = ''
  
  @HostBinding('class.active')
  get mutateCss() {
      return window.location.pathname == this.pathname
  }

  constructor() { }

}
