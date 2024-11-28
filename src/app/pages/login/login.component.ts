import { Component, inject } from '@angular/core';
import { AccesoService } from '../../Services/acceso.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../interfaces/Login';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule, MatButtonModule,  MatInputModule, ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  private AccesoService = inject(AccesoService);
  private router = inject(Router);
  private formBuild = inject(FormBuilder);

  public formLogin: FormGroup = this.formBuild.group({
    correo: ['', [Validators.required, Validators.email]],
    clave: ['', [Validators.required]],
  })


      public iniciarSesion(){
  if(this.formLogin.invalid) return ;

  const objeto: Login = {
      correo: this.formLogin.value.correo,
      clave: this.formLogin.value.clave,

  }

  this.AccesoService.login(objeto).subscribe({
    next: (data) => {
      if(data.isSuccess){
        localStorage.setItem("token", data.token) //guardamos el token en el localstoragew
        this.router.navigate(['/inicio']);
      }else{
        alert("Credenciales son incorrectas")
      }
    },
    error: (error) => {
      console.log(error.message);
    }
  })

      }

      public registrarse (){
        this.router.navigate(['registro'])
      }




}
