import { Component, OnInit } from '@angular/core';
import { LoginInterface } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: LoginInterface = {username: '', password: ''};

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.user).subscribe(
      (token) => {
        this.authService.saveToken(token);
        this.userService.get().subscribe(
          (response) => {
            this.userService.saveUser(response);
            this.router.navigate(['dashboard']);
          },
          (error) => {
            console.log(error);
            alert(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
