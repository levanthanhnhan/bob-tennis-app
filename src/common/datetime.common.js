import moment from 'moment';

class DateTime {
    toDateTime(value) {
        return moment(value).format('DD/MM/YYYY');
    }
}

export default new DateTime();