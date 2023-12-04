import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { userGuard } from './guards/user.guard';
import { PokemonsComponent } from './components/admin/pokemons/pokemons.component';
import { ItemsComponent } from './components/admin/items/items.component';
import { MovesComponent } from './components/admin/moves/moves.component';
import { AbilitiesComponent } from './components/admin/abilities/abilities.component';
import { TeambuilderComponent } from './components/user/teambuilder/teambuilder.component';
import { TeamsComponent } from './components/user/teams/teams.component';
import { BattleComponent } from './components/user/battle/battle.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PasswordResetTokenComponent } from './components/auth/password-reset-token/password-reset-token.component';
import { PasswordResetComponent } from './components/auth/password-reset/password-reset.component';
import { AdminComponent } from './components/auth/admin/admin.component';
import { ConfirmComponent } from './components/auth/confirm/confirm.component';
import { AdminLoginComponent } from './components/auth/admin-login/admin-login.component';
import { AdminRegisterTokenComponent } from './components/auth/admin-register-token/admin-register-token.component';
import { AdminRegisterComponent } from './components/auth/admin-register/admin-register.component';
import { TypesComponent } from './components/admin/types/types.component';
import { HomeComponent } from './components/ui/home/home.component';


const routes: Routes = [
  {path: '', component: HomeComponent },

  {path: '', canActivate:[authGuard], children:[
    {path: "register", component: RegisterComponent},
    {path: "confirm", component: ConfirmComponent},
    {path: "login", component: LoginComponent},
    {path: "password_reset", component: PasswordResetComponent},
    {path: "reset", component: PasswordResetTokenComponent},
    {path: "admin", component: AdminComponent},
    {path: "admin_login", component: AdminLoginComponent},
    {path: "admin_register", component: AdminRegisterComponent}
  ]},

  {path: 'admin', canActivate:[adminGuard], children:[
    {path: "pokemons", component: PokemonsComponent},
    {path: "items", component: ItemsComponent},
    {path: "types", component: TypesComponent },
    {path: "moves", component: MovesComponent},
    {path: "ability", component: AbilitiesComponent},
    {path: "sendAdminRegisterToken", component: AdminRegisterTokenComponent}
    
  ]},

  {path: 'user', canActivate:[userGuard], children:[
    {path: "builder", component: TeambuilderComponent},
    {path: "team", component: TeamsComponent},
    {path: "battle", component: BattleComponent},
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
