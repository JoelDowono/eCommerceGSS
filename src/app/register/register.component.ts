import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      prenom: ["", [Validators.required, Validators.minLength(2)]],
      nom:  ["", [Validators.required, Validators.minLength(2)]],
      email: ["",[Validators.required, Validators.email]],
      password1: ["",[Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      password2: ["",[Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      remember: [false]
    });
  }

  register(){
    const myFirstName = this.registerForm.get("prenom")?.value;
    const myLastName = this.registerForm.get("nom")?.value;
    const myEmail = this.registerForm.get("email")?.value;
    const myPassword1 = this.registerForm.get("password1")?.value;
    const myPassword2 = this.registerForm.get("password2")?.value;
    const isRemember = this.registerForm.get("remember")?.value ? "oui" : "non";
    console.log("Donnée du formulaire..." + myFirstName + " " + myLastName + " " + myEmail + " " + myPassword1 + " " + myPassword2 + " " + isRemember );
    // console.log("Données du formulaire...", this.registerForm.value);
  }

}
