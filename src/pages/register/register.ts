import { Headers, RequestOptions } from '@angular/http';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
	selector: 'page-register',
	templateUrl: 'register.html'
})
export class RegisterPage {
    public nusp: string;
    public username: string;
	  public password: string;

    constructor(private http: Http, private navCtrl: NavController, 
                private alertCtrl: AlertController) {

    }

    onRegister(username: string, nusp: string, password: string) {
        // O formulario que enviaremos deve ser codificado para url, nao no formato json
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new RequestOptions({ headers: headers });
        var body = "nusp=" + encodeURIComponent(nusp) + "&pass=" + encodeURIComponent(password) + "&name=" + encodeURIComponent(username);

        console.log(username, nusp, password);

        // alerta que aparece caso o usuário entre com nusp/senha invalidos
        // e pergunta se ele deseja se registrar ou não
        let sucessAlert = this.alertCtrl.create({
            title: 'Registro efetivado!',
            message: "Você já pode logar em sua conta",
            buttons: [{
                        text: "Ok",
                        handler: null
                      }]
          });

    	  this.http.post("http://207.38.82.139:8001/student/add", body, options)
                 .map(response => response.json())
                 .subscribe(response => {
                                          if (response['success']) {
                                                  sucessAlert.present();
                                                  this.navCtrl.pop();
                                               }
                                           else {
                                                    let failAlert = this.alertCtrl.create({
                                                        title: 'Falha no registro',
                                                        message: response.message
                                                    });
                                                    failAlert.present();
                                                }
                                        },
                            response => console.log(response.logError),
                                  () => console.log("Authentication complete"));

    }

}