import { Pipe, PipeTransform } from '@angular/core';


/*
  OBSERVAÇÕES IMPORTANTES!!
  REGRAS: Toda data que vier do back que conter um array dentro, ele irá ignorar
  EXEMPLO:
   [
     {
       id: 0,
       nota: 'NFE 012546',
       duplicatas: [ // ELE VAI IGNORAR ESSE CARA,
         id: 0,
         numero: 321654165,
       ]
     }
   ]
*/
@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {
  transform(value: object[], hideData: string[]): any {
    const keys = [];
    for (const key in value) {
      if (!hideData) {
        keys.push(key);
      } else {
        if (!Array.isArray(value[key]) && !hideData.includes(key)) {
          keys.push(key);
        }
      }
    }
    return keys;
  }
}
