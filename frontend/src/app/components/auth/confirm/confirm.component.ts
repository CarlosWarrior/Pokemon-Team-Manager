import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {
  constructor(private authService: AuthService, private route: ActivatedRoute){
    if(this.route.snapshot.queryParamMap.get('token') == null)
      this.authService.goToHome()
  }
  confirm(){
    if(this.route.snapshot.queryParamMap.get('token') != null)
      this.authService.confirm(this.route.snapshot.queryParamMap.get('token')!)
  }
}
