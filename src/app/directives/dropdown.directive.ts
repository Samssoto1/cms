import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[cmsDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  // bind to directives elements class

  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
  }
  
  constructor() { }

}
