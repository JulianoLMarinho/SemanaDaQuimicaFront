import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { SharedModule } from '../../shared/shared.module';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  CalendarModule,
  DateAdapter,
  CalendarWeekModule,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    CalendarWeekModule,
  ],
  declarations: [CursosComponent],
  exports: [CursosComponent],
})
export class CursosModule {}
