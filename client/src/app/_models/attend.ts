import {Person} from './person';

export class Attend {
  id: number;
  date: string;
  attend: number;
  workhour: number;
  climbhour: number;
  comment: string;
  person: any;
  month: number;
}

export class AttendDetail {
  id?: number;
  date?: string;
  attend?: number;
  workhour?: number;
  climbhour?: number;
  comment?: string;
  person?: Person;
  month?: Month;
}

export class AttendSum {
  person__id: number;
  person__name: string;
  attend__sum: number;
  workhour__sum: number;
  climbhour__sum: number;
}

export class PageAttendSumObj {
  count: number;
  next: string;
  previous: string;
  results: AttendSum[];
}

export class AttendPageObject {
  count: number;
  next: string;
  previous: string;
  results: Object[];
}

export class Month {
  id: number;
  monthname: string;
  comment: string;
  log_user: string;
  archived: number;
}
