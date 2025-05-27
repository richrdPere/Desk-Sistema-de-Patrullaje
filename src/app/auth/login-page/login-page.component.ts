import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [],
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginPageComponent {
  constructor(private router: Router) {}

  login(){
    this.router.navigate(['/dashboard']);
  }

}
