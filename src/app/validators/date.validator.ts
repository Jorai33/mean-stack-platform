import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export default function ValidateDate(control: AbstractControl) {
    if (!moment(control.value, 'DD/MM/YYYY').isValid()) {
        return {
            validDate: true
        }
    }
    return null;
}