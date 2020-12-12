import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardComponent } from 'src/app/modules/card/card.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CardDetailsComponent } from 'src/app/modules/card-details/card-details.component';
import {MatTableModule} from '@angular/material/table';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatetimepickerModule, MatNativeDatetimeModule } from '@mat-datetimepicker/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NotificationComponent } from 'src/app/modules/notification/notification.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    CardComponent,
    CardDetailsComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatTableModule,
    HighchartsChartModule,
    MatDatepickerModule,
    MatNativeDatetimeModule,
    MatDatetimepickerModule,
    HttpClientModule,
    MatDialogModule,
  ],
})
export class DefaultModule {}
