import store from '../store/store';
import en from '../locals/en.json';
import ru from '../locals/ru.json';

const locals = {
    'ru-RU': ru,
    'en-US': en
};

export default function localizeFilter(key) {
    const local = store.getters.info.local || 'ru-RU';
    return locals[local][key] || `[Localize error]: key ${key} not found`;
}