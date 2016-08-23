import { CustomerList } from '../+customer';

// async components must be named routes for WebpackAsyncRoute
export const routes = {
  path: 'dashboard',
  children: [
    {
        path: 'customer',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: CustomerList }
        ]
    }
  ]
};