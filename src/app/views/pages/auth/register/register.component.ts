import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
  }

}
