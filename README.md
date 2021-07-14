# Backend test task
## Бронирование номеров

Проект разработан в качестве тестового задания back-end
Проект использует npm.
## Техническое задание:
Бронирование номеров в отеле. Реализовать запросы:
* Список доступных номеров на выбранные даты
* Забронировать номер
* Отчет средней загрузки номеров (по дням) в заданном интервале с группировкой по месяцам
Посеять 50+ бронирований
Условия:
* въезд и выезд не могут попадать на понедельник и четверг
* цена за номер 1000 руб
* с 10 дней - 10% скидка
* свыше 20 дней - 20% скидка

## Запуск проекта 
Для запуска проекта локально необходимо: 
1. Склонировать репозиторий;
2. Установить необходимы пакеты и зависимости, выполнив команду: 
```
npm install
```
3. Выполнить запуск приложения командой: 
```
npm start
```

Для запуска тестов необходимо: 
1. Выполнить запуск тестирования командой: 
```
npm test
```

После запуска по url
```
http://localhost:YOUR_PORT/api/
```
где YOUR_PORT по умолчанию 3000 будет доступно описание API.
Описание реализовано с помощью swagger