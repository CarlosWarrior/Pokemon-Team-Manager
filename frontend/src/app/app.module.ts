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
import { HomeComponent } from './components/ui/home/home.component';
import { PokemonCreateDialogComponent } from './components/admin/pokemons/dialogs/pokemon-create-dialog/pokemon-create-dialog.component';
import { PokemonEditDialogComponent } from './components/admin/pokemons/dialogs/pokemon-edit-dialog/pokemon-edit-dialog.component';
import { PokemonDeleteDialogComponent } from './components/admin/pokemons/dialogs/pokemon-delete-dialog/pokemon-delete-dialog.component';
import { PokemonAdminCardComponent } from './components/admin/pokemons/pokemon-admin-card/pokemon-admin-card.component';
import { PokemonUserCardComponent } from './components/user/teambuilder/pokemon-user-card/pokemon-user-card.component';
import { PokemonSlotComponent } from './components/user/slots/pokemon-slot/pokemon-slot.component';
import { ForDirective } from './directives/for.directive';
import { TypeBulkCreateComponent } from './components/admin/types/dialogs/type-bulk-create/type-bulk-create.component';
import { AbilityBulkCreateComponent } from './components/admin/abilities/dialogs/ability-bulk-create/ability-bulk-create.component';
import { MoveBulkCreateComponent } from './components/admin/moves/dialogs/move-bulk-create/move-bulk-create.component';
import { PokemonBulkCreateComponent } from './components/admin/pokemons/dialogs/pokemon-bulk-create/pokemon-bulk-create.component';
import { TeamCoverageComponent } from './components/user/slots/team-coverage/team-coverage.component';
import { TeamSetupComponent } from './components/user/slots/team-setup/team-setup.component';
import { SlotSetupComponent } from './components/user/slots/slot-setup/slot-setup.component';
import { ItemBulkCreateComponent } from './components/admin/items/dialogs/item-bulk-create/item-bulk-create.component';
import { EditTeamDialogComponent } from './components/user/teams/dialogs/edit-team-dialog/edit-team-dialog.component';
import { DeleteTeamDialogComponent } from './components/user/teams/dialogs/delete-team-dialog/delete-team-dialog.component';

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
    HomeComponent,
    PokemonCreateDialogComponent,
    PokemonEditDialogComponent,
    PokemonDeleteDialogComponent,
    PokemonAdminCardComponent,
    PokemonUserCardComponent,
    PokemonSlotComponent,
    ForDirective,
    TypeBulkCreateComponent,
    AbilityBulkCreateComponent,
    MoveBulkCreateComponent,
    PokemonBulkCreateComponent,
    TeamCoverageComponent,
    TeamSetupComponent,
    SlotSetupComponent,
    ItemBulkCreateComponent,
    EditTeamDialogComponent,
    DeleteTeamDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
