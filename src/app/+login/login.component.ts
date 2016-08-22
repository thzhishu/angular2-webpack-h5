import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
  selector: 'login',
  directives: [
    ...ROUTER_DIRECTIVES
  ],
  template: require('./login.html'),
  styles: [require('./login.scss')]
})
export class Login {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Detail` component');
  }

}
