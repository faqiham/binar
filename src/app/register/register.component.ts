import { Component, OnInit,Inject  } from '@angular/core';
import { Router  } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

import { RestProvider } from '../rest/rest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerCredentials:any = { name:'', email: '', password: '' };
  constructor(public spinner: MatDialog,private router: Router,private RestProvider: RestProvider) { }

  ngOnInit() {
  }
  register(){
  	let loadingref = this.spinner.open(RegisterSpinner, {
      width: '280px',
    });
    this.RestProvider.register(this.registerCredentials).subscribe(
    (result:any) => {
    	loadingref.close();
    	let alertref = this.spinner.open(RegisterAlert, {
	      width: '280px',
	      data: {message: "Account has benn registered successfully, Please login."}
	    });
    },
    (err) => {
    	loadingref.close();
    	let alertref = this.spinner.open(RegisterAlert, {
	      width: '280px',
	      data: {message: err.message}
	    });
    });
  }
  login(){
  		this.router.navigate(['']); 
  }

}
@Component({
  selector: 'register-spinner',
  templateUrl: '../modal/loading.html',
})
export class RegisterSpinner {
  detail:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}

@Component({
  selector: 'alert',
  templateUrl: '../modal/alert.html',
})
export class RegisterAlert {
  message: any ;
  constructor(
  	public dialogRef: MatDialogRef<RegisterAlert>,
    @Inject(MAT_DIALOG_DATA) public data: any) { this.message = data.message}
  onNoClick(): void {
    this.dialogRef.close();
  }

}