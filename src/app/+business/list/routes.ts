import { BusinessList } from './list.component';
import { Index } from './index.component';

// async components must be named routes for WebpackAsyncRoute
export const routes = {
  path: 'login', component: BusinessList,
  children: [
    { path: '', component: Index }
  ]
};
