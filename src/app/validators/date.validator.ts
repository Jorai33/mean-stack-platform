import { FormControl } from '@angular/forms';
import * as moment from 'moment';

export class DateValidator {
    static validDate(control: FormControl) {
        if (control.value) {
            if (moment(control.value).isValid()) {
                return true
            } else {
                return false;
            }
        } else {
            return (null);
        }
    }
}