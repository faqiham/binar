import { NgModule } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { RouterModule, Routes, Router  } from '@angular/router';
import { LoginComponent } from '../login/login.component'
import { DashboardComponent } from '../dashboard/dashboard.component'
import { RegisterComponent } from '../register/register.component'

const routes: Routes = [
        {
            path: '',
            component: LoginComponent,
        },
        {
            path: 'dashboard',
            component: DashboardComponent,
        },
        {
            path: 'register',
            component: RegisterComponent,
        }
    ];
@NgModule({
 	imports: [
	    RouterModule.forRoot(routes)
	],
	exports: [
	    RouterModule
	],
	declarations: []
})
export class AppRoutingModule { 
	constructor(router: Router, location: Location){

		if(router.navigated == false){
			router.navigate(['']); 
		}

    };
}
