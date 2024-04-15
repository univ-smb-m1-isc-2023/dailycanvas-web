import {Component, EventEmitter, Output} from '@angular/core';
import {GoogleSigninButtonModule, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-google-login',
  standalone: true,
  imports: [
    GoogleSigninButtonModule
  ],
  templateUrl: './google-login.component.html',
  styleUrl: './google-login.component.css'
})
export class GoogleLoginComponent {
  user: SocialUser = new SocialUser();
  loggedIn: boolean = false;
  load: boolean = false;

  constructor(private authService: SocialAuthService, private userService: UserService) { }

  async googleRegister(user: SocialUser){
    this.load = true
    let res = await this.userService.googleAuthRequest({name: user.name, email: user.email, firstname : user.firstName, lastname: user.lastName})
    if (typeof res == "number" && res != 200){
      console.log("Erreur de connexion google !")
      return;
    }
    console.log("okkkkkkkkkk", this.user)
    this.load = false
  }

  ngOnInit() {
    this.authService.signOut();
    this.authService.authState.subscribe((user) => {
      console.log("chooseUser")
      this.googleRegister(user);
      this.user = user;
      this.loggedIn = (user != null);
    });
  }
}