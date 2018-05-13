import { Component, OnInit,Inject } from '@angular/core';
import { Router  } from '@angular/router';


import { RestProvider } from '../rest/rest';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  product:any;
  constructor(public spinner: MatDialog,private router: Router, private RestProvider: RestProvider,public dialog: MatDialog) {
  	let loadingref = this.spinner.open(loading, {
      width: '280px',
    });
  	this.RestProvider.getData().subscribe( (data:any) => {
      this.product = data.result;
      loadingref.close();
    },
    (err) => {
    	loadingref.close();
    	console.log(err)
    	let alertref = this.spinner.open(DashboardAlert, {
	      width: '280px',
	      data: {message: err.message}
	    });
    });
  }
  ngOnInit() {
  	if (localStorage.getItem('token') == undefined) {
        this.router.navigate(['']);
    }
  }

  openDialog(data = null) {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '280px',
      data: {data:data,product:this.product}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  delete(data){
  	let dialogRef = this.dialog.open(confirmDialog, {
      width: '280px',
      data: {data:data,product:this.product}
    });
  }

  logout(){
  	localStorage.removeItem('token');
  	this.router.navigate(['']); 
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: '../modal/form.html',
})
export class DialogOverviewExampleDialog {
    detail:any;
  constructor(
  	private RestProvider: RestProvider,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    public alert: MatDialogRef<DashboardAlert>,
    public loading: MatDialog,
    @Inject(MAT_DIALOG_DATA,) public data: any) {
  		if (data.data == null) {
  			this.detail =  {name:'',price:'',imageurl:''};
  		}else{
	  		this.detail = data.data;
	  	}
  		console.log(this.detail)
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(){
  	let loadingref = this.loading.open(loading, {
      width: '280px',
    });
  	if (this.data.data == null) {
	  	this.RestProvider.createProducts(this.detail).subscribe(
	    (result:any) => {
	    	console.log(result);
	    	this.data.product.push(result.result);
	    	this.dialogRef.close();
	    	loadingref.close();
	    	let alertref = this.loading.open(DashboardAlert, {
		      width: '280px',
		      data: {message: "Data has been created successfully"}
		    });
	    },
	    (err) => {
	    });
	  }else{
	  	this.RestProvider.updateProducts(this.detail).subscribe(
	    (result:any) => {
	    	console.log(result);
	    	this.dialogRef.close();
	    	loadingref.close();
	    	let alertref = this.loading.open(DashboardAlert, {
		      width: '280px',
		      data: {message: "Data has been updated successfully"}
		    });
	    },
	    (err) => {
	    });
	  }
  }

}

@Component({
  selector: 'confirm-dialog',
  templateUrl: '../modal/confirm.html',
})
export class confirmDialog {
  detail:any;
  constructor(
  	private RestProvider: RestProvider,
    public dialogRef: MatDialogRef<confirmDialog>,
    public loading: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { this.detail = data.data; }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete(){
  	let loadingref = this.loading.open(loading, {
      width: '280px',
    });
  	this.RestProvider.deleteProduct(this.detail).subscribe(
    (result:any) => {
	  	let index =  this.data.product.indexOf(this.detail);
	  	this.data.product.splice(index, 1);
	  	this.dialogRef.close();
	  	loadingref.close();
    },
    (err) => {
    });
  }

}

@Component({
  selector: 'loading',
  templateUrl: '../modal/loading.html',
})
export class loading {
  detail:any;
  constructor(
    public dialogRef: MatDialogRef<confirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}
@Component({
  selector: 'alert',
  templateUrl: '../modal/alert.html',
})
export class DashboardAlert {
  message: any ;
  constructor(
  	public dialogRef: MatDialogRef<DashboardAlert>,
    @Inject(MAT_DIALOG_DATA) public data: any) { this.message = data.message}
  onNoClick(): void {
    this.dialogRef.close();
  }

}