import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import * as moment from 'moment';
import { StyleService } from '../../../services/style.service';
import { CoresEdicaoService } from '../../../services/coresEdicao.service';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
})
export class CalendarViewComponent {
  CalendarView = CalendarView;

  @Input() viewDate!: Date; // usado

  locale = 'pt';
  //usado
  @Input() events: CalendarEvent[] = [];
  @Input()
  refresh!: Subject<void>;
  @Input() clickEvent: Function = () => {};
  @Input() hrefClickLink: string = '';

  activeDayIsOpen: boolean = true;

  constructor(
    private modal: NgbModal,
    public coresEdicao: CoresEdicaoService
  ) {}

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    console.log('algo');
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.clickEvent(event);
  }

  getSegmentText(segment: any) {
    return moment(segment.displayDate).format('hh A');
  }

  test(event: any) {
    console.log(event);
  }
}
