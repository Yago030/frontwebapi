import { Component, inject } from '@angular/core';


import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccesoService } from '../../Services/acceso.service';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/Usuario';



@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [MatButtonModule,MatFormFieldModule,MatInputModule, MatCardModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {


  private AccesoService = inject(AccesoService);
  private router = inject(Router);
  private formBuild = inject(FormBuilder);

  public formRegistro: FormGroup = this.formBuild.group({
    nombre: ['', [Validators.required, Validators.minLength]],
    correo: ['', [Validators.required, Validators.email]],
    clave: ['', [Validators.required]],
  })



  public registrarse(){
    if(this.formRegistro.invalid) return;

    const objeto: Usuario = {
      nombre: this.formRegistro.value.nombre,
      correo: this.formRegistro.value.correo,
      clave: this.formRegistro.value.clave,
    }

    this.AccesoService.registrarse(objeto).subscribe({
      next: (data) => {
        if(data.isSuccess){
          this.router.navigate([""])
        }else {
          alert("credenciales son incorrectas ")
        }
      }, error:(error)=>{
        console.log(error.message)
      }
    })

  }

 public volver(){
  this.router.navigate([""])
 }


}
