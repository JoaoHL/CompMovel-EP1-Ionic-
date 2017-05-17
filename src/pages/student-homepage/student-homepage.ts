import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-student-homepage',
  templateUrl: 'student-homepage.html'
})
export class StudentHomepage {
	public nusp: string;
	public password: string;

  	constructor(private navCtrl: NavController, private navParams: NavParams) {
  		this.nusp = this.navParams.get('nusp');
  		this.password = this.navParams.get('password');
  	}
}
