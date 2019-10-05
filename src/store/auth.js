import firebase from 'firebase/app'

export default {
    actions: {
        async login({ commit }, payload) {
            try {
                //signInWithEmailAndPassword служит для проверки на существование данных
                await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);
            } catch (e) {
                // throw e;
                commit('setError', e);
                throw e;
            }
        },
        async logout({commit}) {
            // signOut - данный метод позволяет отчистить все данные
            await firebase.auth().signOut();
            commit('clearInfo');
        },
        async register({ dispatch, commit }, payload) {
            try {
                // createUserWithEmailAndPassword - добавляем пользователя в firebase
                await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password);
                const uid = await dispatch('getUserId');
                await firebase.database().ref(`/users/${uid}/info`).set({
                    bill: 10000, //начально значение денежного счета
                    name: payload.name
                });
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
        getUserId() {
            // currentUser - получаем текущего пользователя
            const user = firebase.auth().currentUser;
            // если в поле user что-либо есть, то возвращаем user.uid(айди пользователя)
            return user ? user.uid : null;
        }
    }
}