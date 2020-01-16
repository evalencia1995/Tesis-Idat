import { MenuService } from "./_service/menu.service";
import { LoginService } from "./_service/login.service";
import { Component, OnInit } from "@angular/core";
import { Menu } from "./_model/menu";
import { JwtHelperService} from '@auth0/angular-jwt';
import { TOKEN_NAME } from './_shared/var.constants';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "mediapp-frontend";
  menus: Menu[] = [];
  usuario : string;
  perfil : string;
  //siempre que llames a un service en el html inyectarlo como public
  constructor(
    public loginService: LoginService,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    const helper = new JwtHelperService();
    this.menuService.menuCambio.subscribe(data => {
      this.menus = data;
      let tk = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
      const decodedToken = helper.decodeToken(tk.access_token);
      this.usuario = decodedToken.user_name;
      this.perfil = decodedToken.authorities[0];

    });


  }
}
