import { Register } from './register.component';
import { Index } from './index.component';

// async components must be named routes for WebpackAsyncRoute
export const routes = {
  path: 'register', component: Register,
  children: [
    { path: '', component: Index }
  ]
};
