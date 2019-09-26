import * as moment from 'moment';

export class DateHelper {

  static convertTo_DD_MM_YYYY(date: string) {
    return moment(date).format('DD[/]MM[/]YYYY');
  }
}
