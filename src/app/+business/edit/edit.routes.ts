import { BusinessEditComponent } from './edit.component';

// async components must be named routes for WebpackAsyncRoute
export const editRoutes = {
  path: 'edit/:id', component: BusinessEditComponent
};
