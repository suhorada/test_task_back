import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import query from './app.database';
import { AppService } from './app.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import * as Queries from './utils/SQL/queries';
process.env.TZ = 'UTC';

// где должны быть интерфейсы/классы?
interface IDateInterval {
  start: string;
  end: string;
}

interface IParams {
  id: string;
}

interface Row {
  [key: string]: string;
}

class DateQuery {
  @ApiProperty()
  start: string;
  @ApiProperty()
  end: string;
}

class IdParam {
  @ApiProperty()
  id: string;
}

class Rooms {
  @ApiProperty()
  r_id: number;
}

class DayLoad {
  @ApiProperty()
  ['YYYY-MM-DD']: string;
}

class Report {
  @ApiProperty()
  ['Month-YYYY']: DayLoad;
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
  const firstDate: Date = new Date(start);
  const secondDate: Date = new Date(end);
  const d: number = Number(secondDate) - Number(firstDate);
  return d > 0;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/room/date?')
  @ApiOkResponse({
    description: 'Get free rooms on query dates (date?start=&end=)',
    isArray: true,
  })
  @ApiQuery({ type: DateQuery })
  @ApiBody({
    description: 'Message',
    type: [Rooms],
  })
  getFreeRooms(@Query() date: IDateInterval) {
    const dateIsValid = isValid(date.start, date.end);
    if (!dateIsValid) return 'Dates are not valid!!!';

    const getFree = async () => {
      const { rows } = await query(Queries.getFreeRoom2(), [
        date.start,
        date.end,
      ]);
      return rows;
    };
    return getFree();
  }

  @Post('/room/:id/date?')
  @ApiCreatedResponse({
    description: 'Book room on query dates (date?start=&end=)',
  })
  @ApiParam({
    name: 'id',
    type: IdParam,
    example: 1,
  })
  @ApiQuery({ type: DateQuery, example: 'YYYY-MM-DD' })
  dealRoom(@Query() date: IDateInterval, @Param() params: IParams) {
    const dateIsValid = isValid(date.start, date.end);
    if (!dateIsValid) return 'Dates are not valid!!!';

    const tryToPost = async () => {
      let isFree: true | false = false;
      let price: number;

      // нужно ли вынести в функцию? ----------------------------
      const startQuery = await query(Queries.getDayOfDate(date.start));
      const endQuery = await query(Queries.getDayOfDate(date.end));
      const startLikeWeek = startQuery.rows[0].date_part;
      const endLikeWeek = endQuery.rows[0].date_part;

      if (
        startLikeWeek === 4 ||
        startLikeWeek === 1 ||
        endLikeWeek === 4 ||
        endLikeWeek === 1
      )
        return "Booking can't be at Monday or Thursday";
      // нужно ли вынести в функцию? ----------------------------

      const { rows } = await query(Queries.getFreeRoom(date));

      if (rows) {
        isFree = rows.some((el) => el.r_id === Number(params.id));
      }

      const time = await query(Queries.getPeriod(date));
      const { days } = time.rows[0].period;

      // тоже функция ?--------------
      if (days <= 10 && days > 0) price = days * 1000;
      else if (days <= 20) price = days * 1000 * 0.9;
      else price = days * 1000 * 0.8;
      // тоже функция ?--------------

      if (isFree) {
        await query(Queries.insertInDate(date, params.id, price));
        return `Congratulations, Your room ${params.id} is booked from ${date.start} to ${date.end}`;
      } else return `Room is already booked from ${date.start} to ${date.end}`;
    };
    return tryToPost();
  }

  @Get('/report/date?')
  @ApiOkResponse({
    description: 'Get report on query dates (date?start=&end=)',
  })
  @ApiQuery({ type: DateQuery })
  @ApiBody({
    description: 'Message',
    type: [Report],
  })
  getReport(@Query() date: IDateInterval) {
    const dateIsValid = isValid(date.start, date.end);
    if (!dateIsValid) return 'Dates are not valid!!!';

    const reporting = async () => {
      const { rows } = await query(Queries.generateReport(date));

      const time = await query(Queries.getPeriod(date));
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
