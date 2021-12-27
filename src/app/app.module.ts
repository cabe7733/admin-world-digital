import { APP_ROUTING } from './app-routing.routes';
import { ComponentsModule } from './components/components.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

// MDB Modules
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';

/* login */
import { LoginComponent } from './auth/login/login.component';

/* my services */
import { CategoryService } from './services/category.service';
import { BlogService } from './services/blog.service';
import { AuthService } from './services/auth.service';

/* forms module */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* firebase */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

import { environment } from 'src/environments/environment.prod';
import { EditPostComponent } from './modals/edit-post/edit-post.component';


/* FIREBASE CONFIG */
const app = initializeApp(environment.firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app)

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EditPostComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    APP_ROUTING
  ],
  providers: [
    CategoryService,
    BlogService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




/* firebase deploy --only hosting:admin-worlddigitaleya */
