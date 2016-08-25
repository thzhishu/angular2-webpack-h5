import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { CustomerApi, Customer } from 'client';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'customer-form',
    template: require('./form.template.html'),
    styles: [require('./form.style.scss')],
    directives: [ROUTER_DIRECTIVES],
    providers: [CustomerApi ]
})
export class CustomerForm implements OnInit {
    customer: any = {
        id: '',
        vehicleLicence: '',
        mobile: '',
        vehicleFrame: '',
        name: '',
        birthYear: '',
        gender: '',
        vehicleBrand: '',
        vehicleModel: '',
        vehicleYear: '',
        vehicleMiles: '',
        valid: {
            plateNull: false,   // 此项为true
            plateExist: false,  // 此项为false
            mobile: true        // 此项为true可提交
        },
        validShowTip: {
            plate: false,
            mobile: false
        }
    };
    customerOldPlate: any;
    sub: any;
    tempPlate: string = '';
    plateStream = new Subject<string>();
    plateObservable: Observable<any> = this.plateStream.debounceTime(500).distinctUntilChanged().switchMap((term: string, i) => {
        console.log('plate keyup: ', term);
        return this.capi.customerVehicleVehicleLicenceGet(encodeURI(term));
    });

    birthdayYearArr: any[] = [];
    vehicleYearArr: any[] = [];
    miles: any[] = [];
    submiting: boolean = false;
    constructor( private capi: CustomerApi, private router: Router, private route: ActivatedRoute ) {
        const currentYear = +(new Date()).getFullYear();
		this.birthdayYearArr = this.rangeArr(currentYear - 60, currentYear - 16).reverse();
		this.vehicleYearArr = this.rangeArr(2006, currentYear).reverse();
		this.vehicleYearArr.push('2005年及以前');
		this.miles = [
			'5,000公里',
			'10,000公里',
			'15,000公里',
			'20,000公里',
			'25,000公里',
			'30,000公里',
			'35,000公里',
			'40,000公里',
			'45,000公里',
			'50,000公里',
			'55,000公里',
			'60,000公里',
			'65,000公里',
			'70,000公里',
			'75,000公里',
			'80,000公里',
			'85,000公里',
			'90,000公里',
			'95,000公里',
			'100,000公里及以上'
		];
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe( params => {
            console.log('customer form params: ', params);
            if (params['id']) {
                this.getCustomerById(String(params['id']));
            }
        });
        this.plateObservable.subscribe( data => {
            if (data.meta.code === 200 ) {
                const val = this.customer.vehicleLicence;
                if (this.tempPlate === val) {
                    this.customer.valid.plateExist = data.data ? true : false;
                    this.customer.validShowTip.plate = this.customer.valid.plateExist ? true : false;
                } else {
                    this.onPlateExist(this.customer.vehicleLicence);
                }
            }
                
        }, err => {
            console.error(err);
        } );
    }

    rangeArr (start, end) {
        return Array(end - start + 1).fill(0).map((v, i) => i + start);
    }

    getCustomerById(id) {
		this.capi.customerCustomerIdGet(id).subscribe(data => {
			if (data.meta.code === 200 && data.data) {
                if (data.data.vehicleYear === '2005') {
					data.data.vehicleYear = '2005年及以前';
				}
                this.customer = Object.assign(this.customer, data.data);
                this.customerOldPlate = this.tempPlate = this.customer.vehicleLicence;
                this.customer.valid.plateNull = true;
            }
		}, err => console.error(err));
	}

    onPlateFocus() {
        this.customer.validShowTip.plate = false;
    }
    onPlateBlur() {
        const val = this.customer.vehicleLicence;
        if (!val || val.length < 7 || val.length > 9) {
            this.customer.valid.plateNull = false;
            this.customer.validShowTip.plate = true;
            return false;
        }
    }
    onPlateExist(evt) {
        this.customer.vehicleLicence = evt;
        const val = this.customer.vehicleLicence;
        if (this.customerOldPlate && this.customerOldPlate === val) {
            this.customer.valid.plateExist = false;
            return true;
        }
        if ( val === this.tempPlate) return true;
        if (val.length > 6 && val.length < 10) {
            this.customer.valid.plateNull = true;
            this.tempPlate = val;
            this.plateStream.next(val);
        } else {
            this.customer.valid.plateNull = false;
            this.customer.valid.plateExist = false;
            this.customer.validShowTip.plate = false;
        }
    }
    onMobileFocus() {
        this.customer.validShowTip.mobile = false;
    }
    onMobileBlur() {
        const val = this.customer.mobile.trim();
        if (val === '' || /^(13[0-9]|15[012356789]|17[0135678]|18[0-9]|14[579])[0-9]{8}$/.test(val)) {
            this.customer.valid.mobile = true;
            this.customer.validShowTip.mobile = false;
        } else {
            this.customer.valid.mobile = false;
            this.customer.validShowTip.mobile = true;
        }
    }

    goToListPage() {
        this.router.navigate(['/dashboard/customer/list']);
    }

    onSave() {
        if (this.submiting) return;
        const valid = this.customer.valid;
        if ( valid.plateNull === true && valid.plateExist === false && valid.mobile === true ) {
            const vals = this.customer;
            this.submiting = true;
            this.capi.customerSaveOrUpdatePost(
                vals.vehicleLicence.trim(),
                vals.id,
                vals.mobile.trim(),
                vals.vehicleFrame.trim(),
                vals.name.trim(),
                vals.birthYear,
                vals.gender,
                vals.vehicleBrand.trim(),
                vals.vehicleModel.trim(),
                vals.vehicleYear,
                vals.vehicleMiles
            ).subscribe( data => {
                if (data.meta.code === 200) {
                    this.goToListPage();
                }
                this.submiting = false;
            }, err => {
                this.submiting = false;
                console.error(err);
            });
        } else {
            if (valid.plateNull !== true || valid.plateExist !== false) {
                this.customer.validShowTip.plate = true;
            }
            if (valid.mobile !== true) {
                this.customer.validShowTip.mobile = true;
            }
        }
    }

}
