import { BusinessListComponent } from './list';
import { BusinessAddComponent } from './add';
import { BusinessEditComponent } from './edit';

// async components must be named routes for WebpackAsyncRoute
export const businessRoutes = {
  path: 'business',
  children: [
      { path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'list', component: BusinessListComponent },
      { path: 'add', component: BusinessAddComponent },
      { path: 'edit/:id', component: BusinessEditComponent },
  ]
};
