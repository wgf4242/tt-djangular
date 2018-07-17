import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myfilter'
})
export class MyfilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value && args) {
      return value.filter( v => v.name == args).pop();
    }
    return value;
  }

}
