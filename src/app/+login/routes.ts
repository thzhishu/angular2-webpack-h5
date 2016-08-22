import { Login } from './login.component';
import { Index } from './index.component';

// async components must be named routes for WebpackAsyncRoute
export const routes = {
  path: 'login', component: Login,
  children: [
    { path: '', component: Index }
  ]
};
