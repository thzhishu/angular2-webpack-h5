import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
import { Routes, RouterModule } from '@angular/router';
import { Home } from './home';
import { NoContent } from './no-content';

import { Dashboard, CustomerList, BusinessListComponent, BusinessAddComponent, BusinessEditComponent, CustomerAdd, CustomerEdit, CustomerDetail, EmployeeList, EmployeeAdd, EmployeeEdit, ReportWeek } from './+dashboard';
import { SearchResult, SearchPage } from './+search';


import { Login, Index } from './+login';
import { Register } from './+register';
import { ForgetPwd } from './+forget-pwd';


import { DataResolver } from './app.resolver';

// AngularClass
import { provideWebpack } from '@angularclass/webpack-toolkit';
import { providePrefetchIdleCallbacks } from '@angularclass/request-idle-callback';


export const ROUTES: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  {
    path: 'login', component: Login,
    // children: [
    //   { path: '', component: Index }  // must be included
    // ]
  },
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      {path: '', redirectTo: 'customer/list', pathMatch: 'full'},
      {
          path: 'customer',
          children: [
              { path: '', redirectTo: 'list', pathMatch: 'full'},
              { path: 'list', component: CustomerList },
              { path: 'add', component: CustomerAdd },
              { path: 'edit/:id', component: CustomerEdit },
              { path: 'detail/:id', component: CustomerDetail }
          ]
      },
      {
          path: 'employee',
          children: [
              { path: '', redirectTo: 'list', pathMatch: 'full'},
              { path: 'list', component: EmployeeList },
              { path: 'add', component: EmployeeAdd },
              { path: 'edit/:id', component: EmployeeEdit }
              // { path: 'detail/:id', component: CustomerDetail }
          ]
      },
      {
          path: 'business',
          children: [
              { path: '', redirectTo: 'list', pathMatch: 'full'},
              { path: 'list', component: BusinessListComponent },
              { path: 'add', component: BusinessAddComponent },
              { path: 'edit/:id', component: BusinessEditComponent },
          ]
      },
      {
          path: 'search',
          children: [
            { path: 'page', component: SearchPage },
            { path: 'result/:skey', component: SearchResult }
          ]
      },
      {
          path: 'report',
          children: [
            { path: 'week', component: ReportWeek }
          ]
      }
    ]
  },
  {
    path: 'register', component: Register,
    // children: [
    //   { path: '', component: Index }  // must be included
    // ]
  },
  {
    path: 'forget-pwd', component: ForgetPwd,
    // children: [
    //   { path: '', component: Index }  // must be included
    // ]
  },
  // // make sure you match the component type string to the require in asyncRoutes
  // { path: 'about', component: 'About',
  //   resolve: {
  //     'yourData': DataResolver
  //   }},
  // // async components with children routes must use WebpackAsyncRoute
  // { path: 'login', component: 'Login',
  //   canActivate: [ WebpackAsyncRoute ],
  //   children: [
  //     { path: '', component: 'Index' }  // must be included
  //   ]},
  { path: '**', component: NoContent },
];

// Async load a component using Webpack's require with es6-promise-loader and webpack `require`
// asyncRoutes is needed for our @angularclass/webpack-toolkit that will allow us to resolve
// the component correctly

const asyncRoutes: AsyncRoutes = {
  // we have to use the alternative syntax for es6-promise-loader to grab the routes
  // 'About': require('es6-promise-loader!./about'),
  // 'Login': require('es6-promise-loader!./+login'),
  // 'Index': require('es6-promise-loader!./+login'), // must be exported with detail/index.ts
};


// Optimizations for initial loads
// An array of callbacks to be invoked after bootstrap to prefetch async routes
const prefetchRouteCallbacks: Array<IdleCallbacks> = [
  // asyncRoutes['About'],
  // asyncRoutes['Login'],
  // es6-promise-loader returns a function
];


// Es6PromiseLoader and AsyncRoutes interfaces are defined in custom-typings


export const ROUTING_PROVIDERS = [
  provideWebpack(asyncRoutes),
  providePrefetchIdleCallbacks(prefetchRouteCallbacks)
];
