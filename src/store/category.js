import firebase from 'firebase/app'

export default {
    actions: {
        async fetchCategories({ commit, dispatch }) {
            try {
                const uid = await dispatch('getUserId');
                const categories = (await firebase.database().ref(`/users/${uid}/categories/`).once('value')).val() || {};
                // const cats = []; // массив с удобными id который будем возвращать
                // // перебираем массив и меняем вид id на более удобный 0,1,2...
                // console.log(categories);
                // Object.keys(categories).forEach(key => {
                //     cats.push({
                //         title: categories[key].title, // categories[0].title
                //         limit: categories[key].limit, // categories[0].limit
                //         id: key
                //     })
                // })
                // return cats;

                // формируем новый объект запихивая в него оба параметра которые есть в массиве под индексом categories[key] при помощи spread ...
                // и дополнительно вставляем в объект id: key по скольку его нет в массиве под индексом categories[key]
                return Object.keys(categories).map(key => ({ ...categories[key], id: key }));
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
        async fetchCategoryById({ commit, dispatch }, id) {
            try {
                const uid = await dispatch('getUserId');
                const category = (await firebase.database().ref(`/users/${uid}/categories/`).child(id).once('value')).val() || {};
                
                // формируем новый объект запихивая в него оба параметра которые есть в массиве под индексом categories[key] при помощи spread ...
                // и дополнительно вставляем в объект id: key по скольку его нет в массиве под индексом categories[key]
                return {...category, id}
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
        async createCategory({ commit, dispatch }, { title, limit }) {
            try {
                const uid = await dispatch('getUserId');
                const category = await firebase.database().ref(`/users/${uid}/categories/`).push({ title, limit });
                return { title, limit, id: category.key }
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
        async updateCategory({ dispatch, commit }, { title, limit, id }) {
            try {
                const uid = await dispatch('getUserId');
                // обращаемся к определенной категории по ее id при помощи метода child
                // и для обновления мы вызываем метод update и передаем необходимые данные
                await firebase.database().ref(`/users/${uid}/categories/`).child(id).update({ title, limit });
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        }
    }
}
