import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { CustomerApi, Customer } from 'client';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'employee-form',
    template: require('./form.template.html'),
    styles: [require('./form.style.scss')],
    directives: [ROUTER_DIRECTIVES],
    providers: [CustomerApi ]
})
export class EmployeeForm implements OnInit {
    sub: any;
    submiting: boolean = false;

    employee: any = {
        id: '',
        name: '',
        code: '',
        mobile: '',
        serviceTimes: 0,
        createTime: '',
        updateTime: '',
        shops: []
    };

    employeeShopStr: string = '';

    constructor( private capi: CustomerApi, private router: Router, private route: ActivatedRoute ) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe( params => {
            console.log('empolyee form params: ', params);
            if (params['id']) {
                // this.getCustomerById(String(params['id']));
            }
        });
    }

   

}
