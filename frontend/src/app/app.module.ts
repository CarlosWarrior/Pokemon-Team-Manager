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
import { NaturesComponent } from './components/admin/natures/natures.component';
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
    NaturesComponent,
    AbilitiesComponent,
    ActiveDirective,
    PasswordResetComponent,
    PasswordResetTokenComponent,
    AdminComponent,
    GoogleComponent,
    ConfirmComponent,
    AdminLoginComponent,
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
