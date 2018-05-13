import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule,MatButtonModule, MatCheckboxModule,MatGridListModule,MatInputModule,MatIconModule, MatCardModule,MatProgressSpinnerModule,MatDialogModule } from '@angular/material';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { RestProvider } from './rest/rest';

import { AppComponent } from './app.component';
import { LoginComponent,spinner,alert } from './login/login.component';
import { DashboardComponent, DialogOverviewExampleDialog,confirmDialog,loading,DashboardAlert } from './dashboard/dashboard.component';
import { RegisterComponent, RegisterSpinner,RegisterAlert } from './register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DialogOverviewExampleDialog,
    confirmDialog,
    loading,
    spinner,
    alert,
    RegisterSpinner,
    RegisterAlert,
    DashboardAlert,
    RegisterComponent
  ],
  entryComponents: [DialogOverviewExampleDialog,confirmDialog,loading,spinner, alert,RegisterSpinner,RegisterAlert,DashboardAlert],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule, 
	MatCheckboxModule,
	MatGridListModule,
	MatInputModule,
	MatIconModule,
	MatCardModule,
	MatDialogModule,
	FormsModule,
	MatProgressSpinnerModule,
	HttpClientModule,
  ],
  providers: [RestProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
