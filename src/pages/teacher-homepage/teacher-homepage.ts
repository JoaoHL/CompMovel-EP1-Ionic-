import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-teacher-homepage',
  templateUrl: 'teacher-homepage.html'
})
export class TeacherHomepage {
  	public nusp: string;
	public password: string;

  	constructor(private navCtrl: NavController, private navParams: NavParams) {
  		this.nusp = this.navParams.get('nusp');
  		this.password = this.navParams.get('password');
	}
}
