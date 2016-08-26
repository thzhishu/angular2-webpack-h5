import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { CustomerApi, Customer } from 'client';

@Component({
    selector: 'cutomer-detail',
    template: require('./detail.template.html'),
    styles: [require('./detail.style.scss')],
    directives: [ROUTER_DIRECTIVES],
    providers: [CustomerApi ]
})
export class CustomerDetail implements OnInit {
    customerId: number;
    customerDetail: any;
    customer: any = {};
    histories: any = [];
    showCommentWin: Boolean = false;
    showDelWin: Boolean = false;
    historyRecord: any = {};
    sendErr: any = {
        mobile: false,
        times: false
    };
    hasSend: Boolean = false;
    sendTimes: number = 0;
    tempMobile: string = '';
    sub: any;
    page: any = {};
    commentUrl = {
        qrCode: '',
        url: ''
    };
        delRecord:any;
    next:number;
    isUnfold: boolean = false;
    constructor(private cApi: CustomerApi, private router: Router, private route: ActivatedRoute) {

	}

    ngOnInit() {
        this.sub = this.route.params.subscribe( params => {
            this.customerId = +params['id'];
            this.getCustomerById(this.customerId);
            if (!this.customerId) {
                this.router.navigate(['/dashbroad/customer-list']);
            }
        });
        
    }
    getCustomerById(id) {
        this.cApi.customerHistoryCustomerIdGet(id, this.page.current, this.page.limit).subscribe(data => {
        if (data.data) {
            this.customerDetail = data.data;
            this.customer = this.customerDetail.customers && this.customerDetail.customers.length ? this.customerDetail.customers[0] : {};
            this.histories = this.customerDetail.histories || [];
            this.customer = this.formatCustomer(this.customer);
            // this.thzsUtil.getCustomerInfo(this.customer);
            this.customerDetail.historiesTotol = data.meta.total;
            this.customerDetail.totalAvgScore = this.customerDetail.totalAvgScore ? this.customerDetail.totalAvgScore.toFixed(2) : 0;
            this.page.current = data.meta.current;
            this.page.limit = data.meta.limit;
            this.page.total = data.meta.total;
            this.page.pageTotal = Math.ceil(this.page.total / this.page.limit);
            console.log('page: ', this.page);
        } else {
            //啥都没有
            this.customerDetail = {};
        }
        console.log('customer: ', this.customer);
        }, err => console.error(err));
    }
    formatCustomer(customer) {
		const currentYear = (new Date()).getFullYear();
		customer.age = customer.birthYear ? (currentYear - customer.birthYear) : '';
		customer.sex = customer.gender === 0 ? '女' : customer.gender === 1 ? '男' : '';
		return customer;
	}

    onToggleUnfold() {
        this.isUnfold = !this.isUnfold;
    }


}
