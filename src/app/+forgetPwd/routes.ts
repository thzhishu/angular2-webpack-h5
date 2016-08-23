import { ForgetPwd } from './forgetPwd.component';
import { Index } from './index.component';

// async components must be named routes for WebpackAsyncRoute
export const routes = {
  path: 'forget-pwd', component: ForgetPwd,
  children: [
    { path: '', component: Index }
  ]
};
