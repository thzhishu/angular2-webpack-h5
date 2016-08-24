import { Component } from '@angular/core';


@Component({
    selector: 'dashboard',
    template: require('./dashboard.template.html'),
    styles: [require('./dashboard.style.scss')]
})
export class Dashboard {
    showMenu: boolean = false;

    constructor() {}

    onToggleMenu() {
        this.showMenu = !this.showMenu;
    }

}