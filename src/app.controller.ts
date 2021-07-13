import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import query from './app.database';
import { AppService } from './app.service';
process.env.TZ = 'UTC';

// где должны быть интерфейсы?
interface IDateInterval {
  start: string;
  end: string;
}

interface IParams {
  id: string;
}

// константы могу вынести в отдельный модуль, но тут нагляднее
const ROOMS_COUNT = 10;
const monthNames: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const isValid = (start: string, end: string): true | false => {
  const firstDate: any = new Date(start);
  const secondDate: any = new Date(end);
  const d: number = secondDate - firstDate;
  if (d > 0) return true;
  else return false;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/room/date?')
  getFreeRooms(@Query() date: IDateInterval) {
    if (!isValid(date.start, date.end)) return 'Dates are not valid!!!';

    const getFree = async () => {
      const { rows } = await query(
        `SELECT room.r_id FROM room LEFT JOIN date ON (date.room_id = room.r_id 
          AND NOT ( ("date"."start" < '${date.start}' and "date"."end" < '${date.start}') 
          OR ("date"."start" > '${date.end}' and "date"."end" > '${date.end}') )) 
        WHERE date.room_id IS NULL;`,
      );
      return rows;
    };
    return getFree();
  }

  @Post('/room/:id/date?')
  dealRoom(@Query() date: IDateInterval, @Param() params: IParams) {
    if (!isValid(date.start, date.end)) return 'Dates are not valid!!!';

    const tryToPost = async () => {
      let isFree: true | false = false;
      let price: number;

      // нужно ли вынести в функцию? ----------------------------
      const startQuery = await query(
        `select extract(dow from date '${date.start}');`,
      );
      const endQuery = await query(
        `select extract(dow from date '${date.end}');`,
      );
      const startLikeWeek = startQuery.rows[0].date_part;
      const endLikeWeek = endQuery.rows[0].date_part;
      console.log(startLikeWeek, endLikeWeek);

      if (
        startLikeWeek === 4 ||
        startLikeWeek === 1 ||
        endLikeWeek === 4 ||
        endLikeWeek === 1
      )
        return "Booking can't be at Monday or Thursday";
      // нужно ли вынести в функцию? ----------------------------

      const { rows } = await query(
        `SELECT room.r_id FROM room LEFT JOIN date ON (date.room_id = room.r_id 
          AND NOT ( ("date"."start" < '${date.start}' and "date"."end" < '${date.start}') 
          OR ("date"."start" > '${date.end}' and "date"."end" > '${date.end}') )) 
        WHERE date.room_id IS NULL;`,
      );

      if (rows) {
        isFree = rows.some((el) => el.r_id === Number(params.id));
      }

      const time = await query(
        `select -('${date.start}'::timestamp-'${date.end}') as period`,
      );
      const { days } = time.rows[0].period;

      // тоже функция ?--------------
      if (days <= 10 && days > 0) price = days * 1000;
      else if (days <= 20) price = days * 1000 * 0.9;
      else price = days * 1000 * 0.8;
      // тоже функция ?--------------

      if (isFree) {
        await query(
          `INSERT INTO date ("start", "end", room_id, price, interval)
          VALUES ('${date.start}','${date.end}',${params.id},${price},-('${date.start}'::timestamp-'${date.end}'));`,
        );
        return `Congratulations, Your room ${params.id} is booked from ${date.start} to ${date.end}
        ${rows}`;
      } else return `Room is already booked from ${date.start} to ${date.end}`;
    };
    return tryToPost();
  }

  @Get('/report/date?')
  getReport(@Query() date: IDateInterval) {
    if (!isValid(date.start, date.end)) return 'Dates are not valid!!!';

    const reporting = async () => {
      const { rows } = await query(
        `SELECT TO_CHAR(g.d, 'YYYY-MM-DD') AS Date, COUNT(*) AS Used
        FROM generate_series(
            (select '${date.start}')::timestamp,
            (select '${date.end}')::timestamp, '1 day'
          ) AS g(d)
        INNER JOIN date d
          ON 
          (g.d + INTERVAL '1 day', g.d - INTERVAL '1 day') OVERLAPS (d.start, d.end)
          GROUP BY 1
        HAVING COUNT(*) > 0
        ORDER BY 1`,
      );

      const time = await query(
        `select -('${date.start}'::timestamp-'${date.end}') as period`,
      );
      const { days } = time.rows[0].period;

      // тоже в функцию? -------------
      const result = {};
      const report = {};

      rows.forEach((el) => {
        const date = new Date(el.date);
        const stringKey = `${
          monthNames[date.getMonth()]
        }-${date.getFullYear()}`;
        if (stringKey in result) {
          result[stringKey] = {
            customersCount: result[stringKey].customersCount + Number(el.used),
            daysCount: result[stringKey].daysCount + 1,
          };
          report[stringKey] = {
            ...report[stringKey],
            [el.date]: (el.used / ROOMS_COUNT) * 100 + '%',
          };
        } else {
          result[stringKey] = {
            customersCount: Number(el.used),
            daysCount: 1,
          };
          report[stringKey] = {
            [el.date]: (el.used / ROOMS_COUNT) * 100 + '%',
          };
        }
      });
      report['obj_description'] =
        'obj = { obj_description: string, month-YYYY: { YYYY-MM-DD: load } }';
      // тоже в функцию? -------------

      return report;
    };
    return reporting();
  }
}
