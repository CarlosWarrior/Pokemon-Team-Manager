import { AfterViewInit, Component, NgZone } from '@angular/core';
import { accounts } from 'google-one-tap';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit{
  constructor(private ngZone: NgZone, private authService: AuthService) {}

  ngAfterViewInit() {
    const GoogleAccounts: accounts = window.google.accounts;

    GoogleAccounts.id.initialize({
      client_id: environment.google_api_client,
      ux_mode: 'popup',
      cancel_on_tap_outside: true,
      callback: (parameters) => {
        this.ngZone.run(() => {
          this.authService.google(parameters);
        });
      },
    });

    GoogleAccounts.id.renderButton(document.getElementById('google-login') as HTMLElement, {
      size: 'large',
      width: 320,
    });
  }
}
