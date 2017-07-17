export class Attend {
	id: number;
	date: string;
	attend: number;
	workhour: number;
	climbhour: number;
	comment: string;
	person: number;
	month: number;
}

export class AttendSum{
    person__id : number;
    person__name : string;
    attend__sum : number;
    workhour__sum : number;
    climbhour__sum : number;
}

export class PageObj {
	count: number;
	next: string;
	previous: string;
	results: AttendSum[];
}
