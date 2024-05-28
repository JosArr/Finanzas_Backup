import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login-manager',
  templateUrl: './login-manager.component.html',
  styleUrls: ['./login-manager.component.css']
})
export class LoginManagerComponent implements OnInit {

  loginManagerForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService,
              private router: Router, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.loginManagerForm = this.fb.group({
      DNI: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginManagerForm.valid){
      this.userService.getUserByEmail(this.loginManagerForm.value.DNI).subscribe(user => {
        if (user && user.contrasena === this.loginManagerForm.value.contrasena) {
          console.log("Inicio de sesión exitoso");
          this.userService.setUsuarioLogueado(user);
          //this.router.navigate(['/manager']);
        } else {
          console.log("Inicio de sesión fallido");
        }
      });
    }
  }
}