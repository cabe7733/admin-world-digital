import { COMPONENT_ROUTING } from './component-routing.routes';
import { forwardRef, NgModule } from '@angular/core';
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
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
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
import { EditCategoryComponent } from '../modals/edit-category/edit-category.component';
import { EditSubCategoryComponent } from '../modals/edit-sub-category/edit-sub-category.component';
import { UserProfileComponent } from '../pages/user-profile/user-profile.component';
import { Page404Component } from '../pages/page404/page404.component';
import { CreatePostComponent } from '../modals/create-post/create-post.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';



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
    EditCategoryComponent,
    EditSubCategoryComponent,
    UserProfileComponent,
    Page404Component,
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
    COMPONENT_ROUTING,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  providers:[
  ]
})
export class ComponentsModule { }
