export class Month {
  id: number;
  monthname: string;
  comment: string;
  log_user: any;
  archived: number;
  timestamps: number;
}

export class MonthPage {
  count: number;
  next: string;
  previous: string;
  results: Month[];
}
