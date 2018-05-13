import { Component, OnInit,Inject } from '@angular/core';
import { Router  } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

import { RestProvider } from '../rest/rest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerCredentials:any = { email: '', password: '' };
  constructor(public spinner: MatDialog,private router: Router,private RestProvider: RestProvider) { }

  ngOnInit() {
  	if (localStorage.getItem('token') != undefined) {
        this.router.navigate(['dashboard']);
    }
  }

  login(){
  	let loadingref = this.spinner.open(spinner, {
      width: '280px',
    });
    this.RestProvider.login(this.registerCredentials).subscribe(
        (result:any) => {
        	console.log(result)
        	if (result.errors != null) {
	        	loadingref.close();
	        	let alertref = this.spinner.open(alert, {
			      width: '280px',
			      data: {message: result.errors.user_authentication[0]}
			    });
        	}else{
	        	localStorage.setItem('token',result.result.access_token);
	        	loadingref.close();
	        	this.router.navigate(['dashboard']); 
	        }
        },
        (err) => {
        	loadingref.close();
        	console.log(err)
        	let alertref = this.spinner.open(alert, {
		      width: '280px',
		      data: {message: err.message}
		    });
        });
  }

  register(){
  		this.router.navigate(['register']); 
  }

}
@Component({
  selector: 'spinner',
  templateUrl: '../modal/loading.html',
})
export class spinner {
  detail:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}
@Component({
  selector: 'alert',
  templateUrl: '../modal/alert.html',
})
export class alert {
  message: any ;
  constructor(
  	public dialogRef: MatDialogRef<alert>,
    @Inject(MAT_DIALOG_DATA) public data: any) { this.message = data.message}
  onNoClick(): void {
    this.dialogRef.close();
  }

}