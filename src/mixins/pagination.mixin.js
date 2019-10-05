import _ from 'lodash';

export default {
    data(){
        return {
            page: +this.$route.query.page || 1, //если в query есть page, то возвращаем в ЧИСЛОВОМ формате номер страницы, а иначе возвращаем первую страницу
            pageSize: 2,
            pageCount: 0,
            allItems: [], // все данные загруженные с сервера
            items: [], // только те данные которые будем показывать

        }
    },
    methods:{
        // обработка нажатий на номера страниц, вызов происходит из History.vue
        pageChangeHendler(page) {
            this.$router.push(`${this.$route.path}?page=${page}`)
            this.items = this.allItems[page - 1] || this.allItems[0];
        },
        setupPagination(allItems){
            this.allItems = _.chunk(allItems, this.pageSize); // массив с массивами
            this.pageCount = _.size(this.allItems); // определили кол-во страниц
            this.items = this.allItems[this.page - 1] || this.allItems[0]; // выбрали только те данные которые будем показывать

        }
    }
}