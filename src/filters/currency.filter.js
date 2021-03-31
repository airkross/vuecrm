// 1. Данный фильтр форматирует обычное число в вид валютного и добавляет соответствующую валюту.

// 2. value получает кол-во денег в разной валюте ИЛИ
// другими словами то что у нас вернет метод getCurrency в компоненте HomeBill 10 000/154/141

// 3. currency получает название валюты RUB/USD/EUR

export default function currencyFilter(value, currency = 'RUB') {
    return new Intl.NumberFormat('ru-RU', { //ru-RU говорит по каким международным стандартам будет форматироание (рус)
        style: 'currency', // говорит о том что будем что будем работать с опциями валюты
        currency: currency // передаем сюда название валюты, которую надо преобразовать в знак
    }).format(value); // передаем сюда цифру которую надо отформатировать в красивый вид
}