import * as moment from 'moment';
import defaultLocale from './default';

export default {
  ...defaultLocale,
  setMomentLocale() { moment.locale('en-gb'); },
};
