import { Component, NgZone } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss']
})
export class GoogleComponent {
  constructor(private ngZone: NgZone, private authService: AuthService) {}

  ngAfterViewInit() {
    this.authService.initGoogle(this.ngZone)
  }
}
