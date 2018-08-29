export class Line {
  id: string;
  name: string;
  branch?: string[];
  production_date: number;
  transformer: number;
  single_disconnector: number;
  breaker: number;
  disconnector: number;
  grounding_device: number;
  arrester: number;
  pole: number;
  length: number;
  well: number;
  comment: string;
}

export class Branch {
  id: string;
  name: string;
}

export class DefectsCategory {
  id: string;
  name: string;
}
export class DefectsType {
  id: string;
  name: string;
}

export class Defect {
  id: string;
  line: number;
  branch: number;
  position: number;
  description: string;
  comment: string;
  date: string;
  finish_date: string;
  person: string;
  category: number;
  type: string;
}

export class Facility {
  line: number;
  branch: number;
  position: number;
  category: number;
  description: string;
  comment: string;
  date: string;
}
export class FacilityCategory {
  id: string;
  name: string;
}

export class Fault {
  id?: number;
  line?: string;
  date?: string;
  action?: string;
  reconnect?: string;
  reason?: string;
  downtime?: string;
  recover_time?: string;
  phenomenon?: string;
  weather?: string;
  comment?: string;
}
