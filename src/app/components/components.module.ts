import { COMPONENT_ROUTING } from './component-routing.routes';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { PostBlogComponent } from './post-blog/post-blog.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { CKEditorModule } from 'ng2-ckeditor';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
/* forms module */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { MaterialModule } from '../material.module';
import { CreatePostComponent } from './create-post/create-post.component';
import { ListPostComponent } from './list-post/list-post.component';



@NgModule({
  declarations: [
    ComponentsComponent,
    HomeComponent,
    CategoryComponent,
    PostBlogComponent,
    HeaderComponent,
    FooterComponent,
    SubCategoryComponent,
    CreatePostComponent,
    ListPostComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MdbCollapseModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    MdbFormsModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    COMPONENT_ROUTING
  ]
})
export class ComponentsModule { }
