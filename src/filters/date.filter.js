import store from '../store/store';

export default function dateFilter(value, format = "date") {
    const options = {};
    if (format.includes('date')) {
        options.day = '2-digit';
        options.month = 'long';
        options.year = 'numeric';
    }

    if (format.includes('time')) {
        options.hour = '2-digit';
        options.minute = '2-digit';
        options.second = '2-digit';
    }

    const local = store.getters.info.local || 'ru-RU';
    return new Intl.DateTimeFormat(local, options).format(value);
}