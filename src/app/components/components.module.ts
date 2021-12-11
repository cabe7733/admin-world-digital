import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { PostBlogComponent } from './post-blog/post-blog.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';



@NgModule({
  declarations: [
    ComponentsComponent,
    HomeComponent,
    CategoryComponent,
    PostBlogComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
