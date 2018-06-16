/**
 * 投产验收记录
 *
 * @export
 * @class ProductionRecord
 */
export class ProductionRecord {
  id?: string;
  production_date: string;
  line: string;
  branch: string;
  position: string;
  transformer: string;
  single_disconnector: string;
  breaker: string;
  disconnector: string;
  grounding_device: string;
  arrester: string;
  pole: string;
  length: string;
  well: string;
  comment: string;
}
