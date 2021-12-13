import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { ComponentsComponent } from './components/components.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
   { path: 'login', component: LoginComponent },
   { path: 'component', component: ComponentsComponent, canActivate:[AuthGuard] },
   { path: '', redirectTo: '/login', pathMatch: 'full' },
   { path: '**', component: LoginComponent}

];
// tslint:disable-next-line: variable-name
export const APP_ROUTING = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AppRouting {}
