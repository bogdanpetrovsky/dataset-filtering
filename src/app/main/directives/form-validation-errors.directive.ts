import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[dfFormValidationErrors]',
  providers: [],
})
export class FormValidationErrorsDirective implements OnInit {

  @Input() group: FormGroup;
  constructor(
    private el: ElementRef) {
  }

  ngOnInit() {
    this.group.valueChanges.subscribe(() => {
      this.el.nativeElement.innerHTML = '';
      if (this.group.get('password').hasError('pattern') && this.group.get('password').touched) {
        this.el.nativeElement.innerHTML += '<div>Password should have 8 letters minimum, at least one number and one letter</div>';
      }
      if (this.group.get('repeatPassword').hasError('pattern') && this.group.get('repeatPassword').touched) {
        this.el.nativeElement.innerHTML += '<div>Repeated Password should have 8 letters minimum, at least one number and one letter</div>';
      }
      if (this.group.get('email').hasError('email') && this.group.get('email').touched) {
        this.el.nativeElement.innerHTML += '<div>Email should be valid</div>';
      }
      if (this.group.get('password').value !== this.group.get('repeatPassword').value && this.group.get('repeatPassword').touched && this.group.get('password').touched) {
        console.log(this.group.get('password').value, this.group.get('repeatPassword').value);
        this.el.nativeElement.innerHTML += '<div>Passwords should match</div>';
      }
    });
  }
}
