import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //déclaration de la propriété loginForm
  public loginForm!: FormGroup;
  captchaToken ="";

  //injection du Formbuilder dans le constructeur
  constructor(private fb: FormBuilder, private usersService: UsersService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["",[Validators.required, Validators.email]],
      password: ["",[Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      remember: [false],
    });
  }

  // méthode appelée lors du clic sur le bouton "submit"
  login(){
    const myEmail = this.loginForm.get("email")?.value;
    const myPassword = this.loginForm.get("password")?.value;
    const isRemember = this.loginForm.get("remember")?.value ? "oui" : "non"; //ici je passe d'un booléen true/false à une chaine de caractère qui vaut oui/non.
    console.log("Donnée du formulaire..." + myEmail + " " + myPassword + " " + isRemember);
    var users = {
      user_mail : myEmail,
      user_password : myPassword,
      token: this.captchaToken
    }

    //données qui viennent du backend
    this.usersService.login(users).subscribe({
      next: (response: any) => {
       let userLog = response;
       this.storageService.saveUserAndToken(userLog.token, userLog.data)
       this.router.navigate(['/shop']);
        console.log("reponse du backend", userLog);
      },
      error : (error: any) => {
        console.log(error);
      }
    })
    // console.log("Données du formulaire...", this.loginForm.value);
  }

  resolved(captchaRes: string) {
    this.captchaToken = captchaRes;
    //console.log(`Resolved response token: ${captchaRes}`);
  }
}
