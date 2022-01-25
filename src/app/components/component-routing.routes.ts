import { AuthGuard } from './../guards/auth.guard';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PostBlogComponent } from './post-blog/post-blog.component';
import { ComponentsComponent } from './components.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { UserProfileComponent } from '../pages/user-profile/user-profile.component';
import { Page404Component } from '../pages/page404/page404.component';


const routes: Routes = [
 {
    path:'component', component: ComponentsComponent, canActivate:[AuthGuard],
    children: [
      { path: 'perfil', component: UserProfileComponent},
      { path: 'postBlog', component: PostBlogComponent},
      { path: 'category', component: CategoryComponent},
      { path: 'sub-category', component: SubCategoryComponent},
      { path: 'home', component: HomeComponent},
      { path: '404', component: Page404Component },
      { path: '**', redirectTo: '404' },
      { path: '',   redirectTo: '/component/home', pathMatch: 'full' }
    ]
  }
];
// tslint:disable-next-line: variable-name
export const COMPONENT_ROUTING = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ComponentRouting {}
