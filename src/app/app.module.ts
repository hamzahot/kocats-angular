import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdminComponent } from './admin/admin.component';
import { RolePreviewComponent } from './admin/roles/preview/role-preview.component';
import { UserPreviewComponent } from './admin/users/preview/user-preview.component';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PlaygroundComponent } from './playground/playground.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { CustomStringToArrayPipe } from './shared/custom-string-to-array.pipe';
import { CustomApplyColorDirective } from './shared/custom-apply-color.directive';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './auth/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './auth/interceptors/error.interceptor';
import { RegisterComponent } from './register/register.component';
import { CatPreviewComponent } from './admin/cats/preview/cat-preview.component';
import { CatCreateComponent } from './admin/cats/create/cat-create.component';
import { RoleEditComponent } from './admin/roles/edit/role-edit.component';
import { ProductPreviewComponent } from './admin/product/preview/product-preview.component';
import { ProductCreateComponent } from './admin/product/create/product-create.component';
import { RoleCreateComponent } from './admin/roles/create/role-create.component';
import { ActionPreviewComponent } from './admin/action/preview/action-preview.component';
import { ActionCreateComponent } from './admin/action/create/action-create.component';
import { ActionEditComponent } from './admin/action/edit/action-edit.component';
import { ProductEditComponent } from './admin/product/edit/product-edit.component';
import { CatEditComponent } from './admin/cats/edit/cat-edit.component';
import { UserCreateComponent } from './admin/users/create/user-create.component';
import { UserEditComponent } from './admin/users/edit/user-edit.component';
import { PhotoComponent } from './admin/cats/photo/photo.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatListModule } from '@angular/material/list'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTableModule } from '@angular/material/table'
import { MatBadgeModule } from '@angular/material/badge'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { HomeComponent } from './home/home.component';
 

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { ProductsHeaderComponent } from './home/components/products/products-header/products-header.component';
import { FiltersComponent } from './home/components/menu/filters.component';
import { ProductComponent } from './home/components/products/product.component';
import { ProductBoxComponent } from './home/components/products/product-box/product-box.component';
import { CatComponent } from './home/components/cats/cats.component';
import { CatHeaderComponent } from './home/components/cats/cats-header/cat-header.component';
import { CatBoxComponent } from './home/components/cats/cat-box/cat-box.component';
import { CartComponent } from './cart/cart.component';
import { ProductPhotoComponent } from './admin/product/photo/product-photo.component';
import { CatProfileComponent } from './home/components/cats/cat-view/cat-view.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactsComponent } from './contacts/contacts.component';

registerLocaleData(localeDe, 'de-DE', localeDeExtra);




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PlaygroundComponent,
    AdminComponent,
    RolePreviewComponent,
    RoleEditComponent,
    UserPreviewComponent,
    UserCreateComponent,
    UserEditComponent,
    CustomStringToArrayPipe,
    CustomApplyColorDirective,
    LoginComponent,
    RegisterComponent,
    CatPreviewComponent,
    CatCreateComponent,
    CatEditComponent,
    ProductPreviewComponent,
    ProductCreateComponent,
    ProductEditComponent,
    RoleCreateComponent,
    ActionPreviewComponent,
    ActionCreateComponent,
    ActionEditComponent,
    PhotoComponent,
    FooterComponent,
    HomeComponent,
    ProductsHeaderComponent,
    FiltersComponent,
    ProductComponent,
    ProductBoxComponent,
    CatComponent,
    CatHeaderComponent,
    CatBoxComponent,
    CartComponent,
    ProductPhotoComponent,
    CatProfileComponent,
    AboutUsComponent,
    ContactsComponent
    

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'de-DE'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
