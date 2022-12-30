import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedUser: boolean = false;
  username: string = '';
  roles: string[] = [];

  constructor(private readonly keycloak: KeycloakService,
              private readonly translate: TranslateService) {
  }

  async ngOnInit() {
    this.keycloak.isLoggedIn().then(login => {
      this.loggedUser = login;
      if(login) {
        this.keycloak.loadUserProfile().then(() => {
          this.username = this.keycloak.getUsername();
        })
      }
    });
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  register() {
    this.keycloak.register();
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }
}
