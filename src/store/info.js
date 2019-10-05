import firebase from 'firebase/app/'

export default {
    state: {
        info: {

        }
    },
    mutations: {
        setInfo(state, info) {
            state.info = info;
        },
        clearInfo(state) {
            state.info = {};
        }
    },
    actions: {
        // получаем uid пользователя
        async fetchInfo({ dispatch, commit }) {
            try {
                const uid = await dispatch('getUserId');
                // получили поле info, узнать что такое метод once() и val()
                const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
                commit('setInfo', info);
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
        // обновляем данные счета поле добавления записи
        // toUpdate - уже сформированный остаток баланса после добавления записи, то есть либо просуммированный, либо вычтенный
        async updateInfo({ dispatch, commit, getters }, toUpdate) {
            try {
                const uid = await dispatch('getUserId');
                // добавляем в объект, свойства объекта ...getters.info в котором есть bill и name и после
                // меняем bill из ...getters.info на свойство из toUpdate которое содержит в себе уже подсчитанный остаток средств
                const updateData = { ...getters.info, ...toUpdate };
                await firebase.database().ref(`/users/${uid}/info`).update(updateData);
                // перезаписываем данные баланса чтобы они поменялись на других страницах, в частности на главной
                commit('setInfo', updateData);
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        }
    },
    getters: {
        info(state) {
            return state.info;
        }
    }
}