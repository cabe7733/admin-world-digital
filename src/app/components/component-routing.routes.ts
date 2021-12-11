import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PostBlogComponent } from './post-blog/post-blog.component';


const routes: Routes = [
   { path: 'post/:title', component: PostBlogComponent},
   { path: 'inicio', component: HomeComponent},
   { path: '', redirectTo: '/inicio', pathMatch: 'full' },
   { path: '**', component: HomeComponent}

];
// tslint:disable-next-line: variable-name
export const COMPONENT_ROUTING = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ComponentRouting {}
