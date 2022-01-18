import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Users } from '../models/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  users: Users[] = [];
  public registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      prenom: ["", [Validators.required, Validators.minLength(2)]],
      nom:  ["", [Validators.required, Validators.minLength(2)]],
      email: ["",[Validators.required, Validators.email]],
      password1: ["",[Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      password2: ["",[Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      agree: [false,[Validators.required,this.validateEqual(true)]]
    }, { validators: this.checkPasswords });
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password1').value;
    let confirmPass = group.get('password2').value
    return pass === confirmPass ? null : { notSame: true }
  }

  validateEqual( equals: boolean ): ValidatorFn {
    return ( control: AbstractControl ): ValidationErrors | null => {
      return control.value == equals?null: {notEquals: true};
    }
  }

  register(){
    const myFirstName = this.registerForm.get("prenom")?.value;
    const myLastName = this.registerForm.get("nom")?.value;
    const myEmail = this.registerForm.get("email")?.value;
    const myPassword1 = this.registerForm.get("password1")?.value;
    const myPassword2 = this.registerForm.get("password2")?.value;
    const isAgree = this.registerForm.get("agree")?.value;
    console.log("Donnée du formulaire..." + myFirstName + " " + myLastName + " " + myEmail + " " + myPassword1 + " " + myPassword2 + " " + isAgree );
    // console.log("Données du formulaire...", this.registerForm.value);
    var users = {
      first_name : myFirstName,
      last_name : myLastName,
      user_mail : myEmail,
      user_password : myPassword1,
      agree: isAgree
    }
    console.log(users);
    this.usersService.register(users).subscribe({
      next: (response: any) => {
        this.users.push(response.data);
        this.registerForm.reset();
        this.router.navigate(['/login']);
      },
      error : (error: any) => {
        console.log(error);
      }
    })
  }

  resetUser() {

  }

}


/*

resetProduct() {
    this.form["article_name"].value = '';
    this.form["article_description"].value = '';
    this.form["article_price"].value = '';
    this.form["article_quantity"].value = '';
    this.form["article_picture"].value = '';
    this.form["article_category"].value = '';
  }
*/
