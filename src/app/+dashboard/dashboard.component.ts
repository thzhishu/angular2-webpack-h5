import { Component } from '@angular/core';


@Component({
    selector: 'dashboard',
    template: require('./dashboard.template.html'),
    styles: [require('./dashboard.style.scss')]
})
export class Dashboard {
    showMenu: boolean = false;
    showStoreLayer: boolean = false;


    constructor() {}

    onToggleMenu() {
        this.showMenu = !this.showMenu;
    }
    onShowStoreLayer() {
        this.showStoreLayer = true;
    }
    onCloseStoreLayer() {
        this.showStoreLayer = false;
    }
    onToggleStoreLayer(e) {
        console.log(e);
        e.stopPropagation();
        this.showStoreLayer = !this.showStoreLayer;
    }
    changeCurrentStore(e) {
        e.stopPropagation();
        console.log('change store e', e);
    }
    

}