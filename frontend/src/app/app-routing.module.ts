import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { userGuard } from './guards/user.guard';
import { PokemonsComponent } from './components/admin/pokemons/pokemons.component';
import { ItemsComponent } from './components/admin/items/items.component';
import { MovesComponent } from './components/admin/moves/moves.component';
import { NaturesComponent } from './components/admin/natures/natures.component';
import { AbilitiesComponent } from './components/admin/abilities/abilities.component';
import { TeambuilderComponent } from './components/user/teambuilder/teambuilder.component';
import { TeamsComponent } from './components/user/teams/teams.component';
import { BattleComponent } from './components/user/battle/battle.component';
import { AccountComponent } from './components/user/account/account.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ResetComponent } from './components/auth/reset/reset.component';
import { AdminComponent } from './components/auth/admin/admin.component';


const routes: Routes = [
  {path: 'auth', canActivate:[authGuard], children:[
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "reset", component: ResetComponent},
    {path: "admin", component: AdminComponent},
  ]},

  {path: 'admin', canActivate:[adminGuard], children:[
    {path: "pokemons", component: PokemonsComponent},
    {path: "items", component: ItemsComponent},
    {path: "moves", component: MovesComponent},
    {path: "nature", component: NaturesComponent},
    {path: "ability", component: AbilitiesComponent},
  ]},

  {path: 'user', canActivate:[userGuard], children:[
    {path: "builder", component: TeambuilderComponent},
    {path: "team", component: TeamsComponent},
    {path: "battle", component: BattleComponent},
    {path: "account", component: AccountComponent},
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
