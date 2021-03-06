import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { UserApi, ShopApi, Shop, MyAcountResponse } from 'client';
import { Cookie} from 'services';

import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';

const NO_MENU_URLS = [
    '/dashboard/customer/add',
    '/dashboard/customer/edit',
    '/dashboard/employee/add',
    '/dashboard/employee/edit',
    '/dashboard/business/add',
    '/dashboard/business/edit',
];
const NO_TOPBAR_URLS = [
    '/dashboard/search/page'
];

@Component({
    selector: 'dashboard',
    template: require('./dashboard.template.html'),
    styles: [require('./dashboard.style.scss')],
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS, UserApi, ShopApi, Cookie]
})
export class Dashboard {
    showMenu: boolean = false;
    showStoreLayer: boolean = false;
    title: string;
    storeName: string;
    shopId: number;
    list: Array<Shop>;
    routeSub: any;
    noMenu: boolean = false;
    noTopbar: boolean = false;
    body: any;

    constructor(private router: Router, private uApi: UserApi, private sApi: ShopApi) {
        this.routeSub = this.router.events.filter( event => event instanceof NavigationEnd)
                                          .map(event => event.url)
                                          .subscribe( data => {
                                              this.body = document.getElementsByTagName('body')[0];
		                                          this.body.removeEventListener('touchmove', function(e) {
                                                e.preventDefault();
                                              });
                                              console.log('NavigationEnd URL: ', data);
                                              if (data.includes('/edit/')) {
                                                data = data.slice(0, data.indexOf('/edit/') + 5);
                                              }
                                              this.noMenu = NO_MENU_URLS.includes(data) ? true : false;
                                              this.noTopbar = NO_TOPBAR_URLS.includes(data) ? true : false;
                                          });
                                    }

    ngOnInit() {
      this.getMe();
    }
    ngOnDestroy() {
      this.routeSub.unsubscribe();
    }

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
        e.stopPropagation();
        this.showStoreLayer = !this.showStoreLayer;
    }

    getMe() {
      this.uApi.userMeGet().subscribe((data: MyAcountResponse) => {
        this.shopId = data.data.user.lastShopId;
        this.getList();
      })
    }

    getList() {
      this.sApi.shopMyshopGet().subscribe((data) => {
        this.list = data.data;
        _.forEach(this.list, (val, i) => {
          if (this.shopId === val.id) {
            this.storeName = val.name;
          }
        })
      })
    }

    changeCurrentStore(item) {
      this.uApi.userShopCurrentPost(item.id).subscribe((data) => {
        this.storeName = item.name;
        Cookie.save('shopId', item.id);
        if (this.router.url === '/dashboard/business/list') {
            window.location.reload();
        } else {
          this.router.navigate(['/dashboard/business/list']);
        }

      });
    }

    gotoSearchPage() {
        this.router.navigate(['/dashboard/search/page']);
    }

}
