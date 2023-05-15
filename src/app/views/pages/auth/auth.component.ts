import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn)
      this.router.navigate(['/dashboard']);
  }

}
