import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import {PieChartComponent} from './pie-chart/pie-chart.component'
// import { NgxOdometerModule } from 'ngx-odometer';
import { GaugeMeterComponent } from './gauge-meter/gauge-meter.component';
import { NgxGaugeModule } from 'ngx-gauge';
import { GaugeChartModule } from 'angular-gauge-chart';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
@NgModule({ schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
   
    AppComponent,
    CandidatesComponent,PieChartComponent, GaugeMeterComponent, HeaderComponent, FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,NgbModule,CommonModule,
    NgxGaugeModule,
    NgChartsModule,
    GaugeChartModule,FormsModule,ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
