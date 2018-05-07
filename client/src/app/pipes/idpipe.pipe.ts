import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idpipe'
})
export class MyIdPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value && args) {
      return value.filter( v => v.id == args).pop();
    }
    return value;
  }

}
