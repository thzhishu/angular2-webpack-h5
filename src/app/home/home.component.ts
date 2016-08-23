import { Component, NgZone } from '@angular/core';

@Component({
	selector: 'home',
	styles: [ require('./home.style.scss') ],
	template: require('./home.template.html')
})
export class Home {
	showMenu: boolean = false;
	showAboutUs: boolean = false;
	showContactUs: boolean = false;
	current: boolean = false;
	zone: any;
	constructor() {
		this.zone = new NgZone({ enableLongStackTrace: false });
	}

	ngOnInit() {
		window.setInterval(() => {
			this.zone.run(() => {
				this.current = this.current ? false : true;
			});
		}, 5e3);
	}

	onToggleMenu() {
		this.showMenu = !this.showMenu;
	}

	onToggleAboutUs() {
		this.showAboutUs = !this.showAboutUs;
	}

	onToggleContactUs() {
		this.showContactUs = !this.showContactUs;
	}

}
