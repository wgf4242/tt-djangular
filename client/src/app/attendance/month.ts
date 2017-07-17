export class MonthObj {
	id: number;
	monthname: string;
	comment: string;
	log_user: any;
	archived: number;
	timestamps: number;

}

export class Month {
	count: number;
	next: string;
	previous: string;
	results: MonthObj[]
}
