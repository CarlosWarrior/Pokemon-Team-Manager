import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/ui/navigation/navigation.component';
import { PokemonsComponent } from './components/admin/pokemons/pokemons.component';
import { ItemsComponent } from './components/admin/items/items.component';
import { MovesComponent } from './components/admin/moves/moves.component';
import { TeambuilderComponent } from './components/user/teambuilder/teambuilder.component';
import { TeamsComponent } from './components/user/teams/teams.component';
import { BattleComponent } from './components/user/battle/battle.component';
import { AccountComponent } from './components/user/account/account.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AbilitiesComponent } from './components/admin/abilities/abilities.component';
import { ActiveDirective } from './directives/ui/active.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { PasswordResetComponent } from './components/auth/password-reset/password-reset.component';
import { PasswordResetTokenComponent } from './components/auth/password-reset-token/password-reset-token.component';
import { AdminComponent } from './components/auth/admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleComponent } from './components/auth/google/google.component';
import { ConfirmComponent } from './components/auth/confirm/confirm.component';
import { AdminLoginComponent } from './components/auth/admin-login/admin-login.component';
import { AdminRegisterTokenComponent } from './components/auth/admin-register-token/admin-register-token.component';
import { AdminRegisterComponent } from './components/auth/admin-register/admin-register.component';
import { LoadingButtonComponent } from './components/ui/loading-button/loading-button.component';
import { TypesComponent } from './components/admin/types/types.component';
import { TypeEditDialogComponent } from './components/admin/types/dialogs/type-edit-dialog/type-edit-dialog.component';
import { TypeCreateDialogComponent } from './components/admin/types/dialogs/type-create-dialog/type-create-dialog.component';
import { TypeDeleteDialogComponent } from './components/admin/types/dialogs/type-delete-dialog/type-delete-dialog.component';
import { AbilitiesCreateDialogComponent } from './components/admin/abilities/dialogs/abilities-create-dialog/abilities-create-dialog.component';
import { AbilitiesEditDialogComponent } from './components/admin/abilities/dialogs/abilities-edit-dialog/abilities-edit-dialog.component';
import { AbilitiesDeleteDialogComponent } from './components/admin/abilities/dialogs/abilities-delete-dialog/abilities-delete-dialog.component';
import { MoveCreateDialogComponent } from './components/admin/moves/dialogs/move-create-dialog/move-create-dialog.component';
import { MoveEditDialogComponent } from './components/admin/moves/dialogs/move-edit-dialog/move-edit-dialog.component';
import { MoveDeleteDialogComponent } from './components/admin/moves/dialogs/move-delete-dialog/move-delete-dialog.component';
import { ItemCreateDialogComponent } from './components/admin/items/dialogs/item-create-dialog/item-create-dialog.component';
import { ItemEditDialogComponent } from './components/admin/items/dialogs/item-edit-dialog/item-edit-dialog.component';
import { ItemDeleteDialogComponent } from './components/admin/items/dialogs/item-delete-dialog/item-delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PokemonsComponent,
    ItemsComponent,
    MovesComponent,
    TeambuilderComponent,
    TeamsComponent,
    BattleComponent,
    AccountComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AbilitiesComponent,
    ActiveDirective,
    PasswordResetComponent,
    PasswordResetTokenComponent,
    AdminComponent,
    GoogleComponent,
    ConfirmComponent,
    AdminLoginComponent,
    AdminRegisterTokenComponent,
    AdminRegisterComponent,
    LoadingButtonComponent,
    TypesComponent,
    TypeEditDialogComponent,
    TypeCreateDialogComponent,
    TypeDeleteDialogComponent,
    AbilitiesCreateDialogComponent,
    AbilitiesEditDialogComponent,
    AbilitiesDeleteDialogComponent,
    MoveCreateDialogComponent,
    MoveEditDialogComponent,
    MoveDeleteDialogComponent,
    ItemCreateDialogComponent,
    ItemEditDialogComponent,
    ItemDeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
