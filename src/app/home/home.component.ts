import { Component } from '@angular/core';

@Component({
	selector: 'home', 
	styles: [ require('./home.style.scss') ],
	template: require('./home.template.html')
})
export class Home {
	showMenu: boolean = false;
	constructor() {}

	ngOnInit() {}

	onToggleMenu() {
		this.showMenu = !this.showMenu;
	}

}
