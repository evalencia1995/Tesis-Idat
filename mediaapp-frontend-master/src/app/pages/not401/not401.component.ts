import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN_NAME } from 'src/app/_shared/var.constants';

@Component({
  selector: 'app-not401',
  templateUrl: './not401.component.html',
  styleUrls: ['./not401.component.css']
})
export class Not401Component implements OnInit {

  usuario: string;

  constructor() { }

  ngOnInit() {
    const helper = new JwtHelperService();

    let token = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
    const decodedToken = helper.decodeToken(token.access_token);
    this.usuario = decodedToken.user_name;
  }
}
