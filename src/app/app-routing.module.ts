import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActionCreateComponent } from "./admin/action/create/action-create.component";
import { ActionEditComponent } from "./admin/action/edit/action-edit.component";
import { ActionPreviewComponent } from "./admin/action/preview/action-preview.component";
import { ActionResolver } from "./admin/action/resolvers/action.resolver";
import { AdminComponent } from "./admin/admin.component";
import { CatCreateComponent } from "./admin/cats/create/cat-create.component";
import { CatEditComponent } from "./admin/cats/edit/cat-edit.component";
import { PhotoComponent } from "./admin/cats/photo/photo.component";
import { CatPreviewComponent } from "./admin/cats/preview/cat-preview.component";
import { CatResolver } from "./admin/cats/resolvers/cat.resolver";
import { ProductCreateComponent } from "./admin/product/create/product-create.component";
import { ProductEditComponent } from "./admin/product/edit/product-edit.component";
import { ProductPreviewComponent } from "./admin/product/preview/product-preview.component";
import { ProductResolver } from "./admin/product/resolvers/product.resolver";
import { RoleCreateComponent } from "./admin/roles/create/role-create.component";
import { RoleEditComponent } from "./admin/roles/edit/role-edit.component";
import { RolePreviewComponent } from "./admin/roles/preview/role-preview.component";
import { RoleResolver } from "./admin/roles/resolvers/role.resolver";
import { UserCreateComponent } from "./admin/users/create/user-create.component";
import { UserEditComponent } from "./admin/users/edit/user-edit.component";
import { UserPreviewComponent } from "./admin/users/preview/user-preview.component";
import { AlreadyAuthenticatedGuard } from "./auth/guards/already-authenticated.guard";
import { CartComponent } from "./cart/cart.component";
import { CatComponent } from "./home/components/cats/cats.component";
import { ProductComponent } from "./home/components/products/product.component";
import { ProductsHeaderComponent } from "./home/components/products/products-header/products-header.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { PlaygroundComponent } from "./playground/playground.component";
import { RegisterComponent } from "./register/register.component";
import { ProductPhotoComponent } from "./admin/product/photo/product-photo.component";
import { CatProfileComponent } from "./home/components/cats/cat-view/cat-view.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { ContactsComponent } from "./contacts/contacts.component";

const routes: Routes =  [
    {
        path : 'home',
        component : HomeComponent,
        children : [
            {path : 'cat' , component : CatComponent},
            {path : 'product' , component : ProductComponent},
            {path:'', redirectTo: 'product', pathMatch: 'full'},
            
        ]
    },
    {path : 'cat-profile/:id' , component : CatProfileComponent},
    {
        path : 'playground',
        component : PlaygroundComponent
    },
    {
        path : 'cart',
        component : CartComponent
    },
    {
        path : 'admin',
        component : AdminComponent,
        children : [
            {path : 'roles/preview' , component : RolePreviewComponent },
            {path : 'roles/edit/:id' , component : RoleEditComponent, resolve : {roleDetails : RoleResolver} },
            {path : 'roles/create' , component : RoleCreateComponent },
            {path : 'users/preview' , component : UserPreviewComponent },
            {path : 'user/create' , component : UserCreateComponent },
            {path : 'user/edit' , component : UserEditComponent},
            {path : 'cat/preview' , component : CatPreviewComponent },
            {path : 'cat/create' , component : CatCreateComponent },
            {path : 'cat/edit/:id' , component : CatEditComponent, resolve : {catDetails : CatResolver} },
            {path : 'product/preview' , component : ProductPreviewComponent },
            {path : 'product/create' , component : ProductCreateComponent },
            {path : 'product/edit/:id' , component : ProductEditComponent , resolve : {productDetails : ProductResolver} },
            {path : 'action/preview' , component : ActionPreviewComponent },
            {path : 'action/create' , component : ActionCreateComponent },
            {path : 'action/edit/:id' , component : ActionEditComponent , resolve : {actionDetails : ActionResolver} },
            {path : 'product/addPhoto' , component : ProductPhotoComponent}
        ]   
    },
    {
        path : 'about-us', component : AboutUsComponent
    },
    {
        path : 'contact' , component : ContactsComponent
    },
    {
        path : 'photo',
        component : PhotoComponent
    },
    {
        path : 'login',
        component : LoginComponent,
        canActivate : [AlreadyAuthenticatedGuard]
    },
    {
        path : 'register',
        component : RegisterComponent,
        canActivate : [AlreadyAuthenticatedGuard]
    },
    {
        path: '**' , redirectTo : 'home'
    }
]


@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})
export class AppRoutingModule {

}