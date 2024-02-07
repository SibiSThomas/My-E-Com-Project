import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'base64'
})
export class Base64Pipe implements PipeTransform {

  transform(value?:any, contentType?:number): unknown {
    return `data: ${contentType}; base64, ${value}`;
  }

}
