import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Entity } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class adminGuard {
  valid: boolean = false;
  constructor(private authService: AuthService, private router: Router){
    this.authService.entity.subscribe((entity: Entity | undefined) => this.valid = entity && entity.role == 'admin'?true:false)
  };
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      return  this.valid
  }
  
}