import { Business } from './business.component';
import { Index } from './index.component';

// async components must be named routes for WebpackAsyncRoute
export const routes = {
  path: 'login', component: Business,
  children: [
    { path: '', component: Index }
  ]
};
