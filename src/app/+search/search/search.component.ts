import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { CustomerApi, Customer } from 'client';


@Component({
    selector: 'search-page',
    template: require('./search.template.html'),
    styles: [require('./search.style.scss')],
    directives: [...ROUTER_DIRECTIVES],
    providers: [CustomerApi]
})
export class SearchPage implements OnInit {
    constructor(private capi: CustomerApi, private router: Router, private route: ActivatedRoute) {
        
    }

    ngOnInit() {
    }

}