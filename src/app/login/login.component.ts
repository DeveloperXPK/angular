import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h1 class='text-primary text-align-center'> Login </h1>
    <div class='row'>
      <div class='col-6 d-flex justify-content-center'>
        <label for='tbUsername'>Email</label>
      </div>
      <div class='col-6'>
        <input type='text' id='tbUsername' [(ngModel)]='username'/>
      </div>

      <div class='col-6 d-flex justify-content-center'>
        <label for='tbPassword'>Password</label>
      </div>
      <div class='col-6'>
        <input type='password' id='tbPassword' [(ngModel)]='password'/>
      </div>

      <div class='col-12 d-flex justify-content-center'>
        <button class='btn btn-primary' (click)='validateUserCredentials()'>Iniciar Sesion</button>
      </div>
    </div>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public username: string = '';
  public password: string = '';
  public apiResponse: any = '';

  constructor(private http: HttpClient, private router: Router) {}

  public validateUserCredentials(): void {
    const url = 'http://localhost:9898/api/login'

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const body = {
      email: this.username,
      password: this.password
    }

    this.http.post(url, body, { headers }).subscribe({
        next: resp => {
          this.apiResponse = resp;
          let token = this.apiResponse.token;

          sessionStorage.setItem('session_token', token);
          this.router.navigate(['/menu']);
        },
        error: error => {
          console.log(error);
        }
      } 
    )
  }
}
