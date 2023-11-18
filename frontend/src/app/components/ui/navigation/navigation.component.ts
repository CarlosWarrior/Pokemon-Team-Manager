import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Entity } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy{  
  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this._entitySubscription = this.authService.entity.subscribe((entity: Entity | undefined) => this.entity=entity)
  }
  ngOnDestroy(): void {
      this._entitySubscription?.unsubscribe()
  }
  _entitySubscription?: Subscription
  entity?: Entity
  logout(){
    this.authService.logout()
  }

}
