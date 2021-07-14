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

# База данных

Структура базы данных в конфигурации:
* Имя: 
hotel
* Таблицы:
```
room:
    -r_id
date:
    -d_id
    -end
    -interval
    -price
    -room_id
    -start
```

## Скрипты для создания аналогичных таблиц:

1. Создать 2 последовательности:
```
BEGIN;

-- CREATE SEQUENCE "inc_date_sequence" -------------------------
CREATE SEQUENCE "public"."inc_date_sequence"
INCREMENT 1
MINVALUE 1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
-- -------------------------------------------------------------

-- CHANGE "CURRENT VALUE" OF "SEQUENCE "inc_date_sequence" -----
ALTER SEQUENCE "public"."inc_date_sequence" RESTART 35;
-- -------------------------------------------------------------

COMMIT;

BEGIN;

-- CREATE SEQUENCE "inc_sequence" ------------------------------
CREATE SEQUENCE "public"."inc_sequence"
INCREMENT 1
MINVALUE 1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
-- -------------------------------------------------------------

-- CHANGE "CURRENT VALUE" OF "SEQUENCE "inc_sequence" ----------
ALTER SEQUENCE "public"."inc_sequence" RESTART 53;
-- -------------------------------------------------------------

COMMIT;
```

2. Создать таблицу room
```
BEGIN;

-- CREATE TABLE "room" -----------------------------------------
CREATE TABLE "public"."room" ( 
	"r_id" Integer DEFAULT nextval('inc_sequence'::regclass) NOT NULL,
	PRIMARY KEY ( "r_id" ) );
 ;
-- -------------------------------------------------------------

COMMIT;
```

3. Создать таблицу date
```
BEGIN;

-- CREATE TABLE "date" -----------------------------------------
CREATE TABLE "public"."date" ( 
	"d_id" Integer DEFAULT nextval('inc_date_sequence'::regclass) NOT NULL,
	"start" Date NOT NULL,
	"room_id" Integer NOT NULL,
	"interval" Interval,
	"price" Integer NOT NULL,
	"end" Date NOT NULL,
	PRIMARY KEY ( "d_id" ) );
 ;
-- -------------------------------------------------------------

COMMIT;

BEGIN;

-- CREATE LINK "room_date_FK" ----------------------------------
ALTER TABLE "public"."date"
	ADD CONSTRAINT "room_date_FK" FOREIGN KEY ( "room_id" )
	REFERENCES "public"."room" ( "r_id" ) MATCH FULL
	ON DELETE Cascade
	ON UPDATE Cascade;
-- -------------------------------------------------------------

COMMIT;
```

P.S. Для работы неободимо вручную добавить номера в room (r_id - цифровое значение номера в отеле), при тестировании использовалось 5 номеров. При использовании наших тестов очистку таблиц производить необходимо вручную.

P.P.S Диаграмма в виде png в корне