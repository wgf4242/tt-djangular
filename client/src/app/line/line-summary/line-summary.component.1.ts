// openProductionFormDialog() {
//   const dialogRef = this.dialog.open(ProductionFormDialogComponent, {
//     width: '250px',
//     data: { lines: this.lines }
//   });

//   let line_id: any;
//   dialogRef.afterClosed().pipe(
//     filter(n => n),
//     switchMap(result => this.lineService.addProductionRecord(result)),
//     tap(productRecord => {line_id = productRecord.line; console.log(productRecord, line_id)}),
//     withLatestFrom(this.lineService.getLineInfo(line_id)),
//     map(([productRecord, line]) => {
//       const updateMap = {id: productRecord.line};
//       const arr = ['transformer', 'single_disconnector', 'breaker', 'disconnector', 'grounding_device', 'arrester', 'pole', 'length'];
//       for (const key of arr) {
//         if (productRecord.hasOwnProperty(key)) {
//           updateMap[key] = line[key] + productRecord[key];
//         }
//       }
//       return this.lineService.updateLineInfo(updateMap);
//     })
//   ).subscribe(result => console.log('The dialog was closed', result));
// }

// getUpdateFieldsByProduction(object: ProductionRecord): any {
//   const m = {};
//   const line_id = object.line;
//   let line: any;
//   this.getLineInfo(line_id).pipe(v => {
//     line = v;
//     console.log(v);
//     // line.transformer += object.transformer;
//     const arr = ['transformer', 'single_disconnector', 'breaker', 'disconnector', 'grounding_device', 'arrester', 'pole', 'length'];
//     for (const key of arr) {
//       if (object.hasOwnProperty(key)) {
//         m[key] = line[key] + object[key];
//       }
//     }
//     this.updateLineInfo(m);
//   });
// }
