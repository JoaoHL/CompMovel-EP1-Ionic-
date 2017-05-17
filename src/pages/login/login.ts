import { Headers, RequestOptions } from '@angular/http';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { RegisterPage } from '../register/register';
import { TeacherHomepage } from '../teacher-homepage/teacher-homepage';
import { StudentHomepage } from '../student-homepage/student-homepage';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
    public nusp: string;
	  public password: string;
    public type_user: string;

    constructor(private http: Http, private navCtrl: NavController, 
                private alertCtrl: AlertController) {

    }

    onLogin(nusp: string, password: string) {
        // O formulario que enviaremos deve ser codificado para url, nao no formato json
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new RequestOptions({ headers: headers });
        var body = "nusp=" + encodeURIComponent(nusp) + "&pass=" + encodeURIComponent(password);

        // alerta que aparece caso o usuário entre com nusp/senha invalidos
        // e pergunta se ele deseja se registrar ou não
        let alert = this.alertCtrl.create({
            title: 'Senha incorreta!',
            message: "Você quer se registrar?",
            buttons: [{
                        text: "Sim",
                        handler: () => {this.navCtrl.push(RegisterPage);}
                      },{
                         text: "Não",
                         handler: null
                     }]
          });

    	  this.http.post("http://207.38.82.139:8001/login/student", body, options)
                 .map(response => response.json())
                 .subscribe(response => {
                                          if (response['success']) {
                                                  let data = {nusp: nusp, password: password, type_user: "student"};
                                                  this.navCtrl.setRoot(StudentHomepage, data);
                                               }
                                           else {
                                                    this.http.post("http://207.38.82.139:8001/login/teacher", body, options)
                                                             .map(response => response.json())
                                                             .subscribe(response => {
                                                                                        if (response['success']) {
                                                                                            let data = {nusp: nusp, password: password, type_user: "teacher"};
                                                                                            this.navCtrl.setRoot(TeacherHomepage, data);
                                                                                        }
                                                                                        else {
                                                                                            alert.present();
                                                                                        }
                                                                                    },
                                                                        response => console.log(response.logError),
                                                                        () => console.log())
                                                }
                                        },
                            response => console.log(response.logError),
                                  () => console.log("Authentication complete"));

    }

}