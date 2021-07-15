import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';

import { AppService } from './app.service';
import query from './app.database';
import * as Queries from './utils/SQL/queries';
import { IDateInterval, IParams, IReportRow } from './types/interface';
import { DateQuery, IdParam, Rooms, Report } from './types/class';
import { constants } from './utils/const';

process.env.TZ = 'UTC';

const isValid = (start: string, end: string): true | false => {
  const firstDate: Date = new Date(start);
  const secondDate: Date = new Date(end);
  const d: number = Number(secondDate) - Number(firstDate);
  return d > 0;
};

const getRooms = async (date: IDateInterval) => {
  const { rows } = await query(Queries.getFreeRoom, [date.start, date.end]);
  return rows;
};

const checkDays = (date: IDateInterval) => {
  const start = new Date(date.start);
  const end = new Date(date.end);

  if (
    start.getDay() === 4 ||
    start.getDay() === 1 ||
    end.getDay() === 4 ||
    end.getDay() === 1
  ) {
    return true;
  } else return false;
};

const calcPrice = (days: number) => {
  let price: number;
  if (days <= constants.discount.SM_DAYS_COUNT && days > 0) {
    price = days * constants.DAY_PRICE;
  } else if (days <= constants.discount.MD_DAYS_COUNT) {
    price = days * constants.DAY_PRICE * constants.discount.SM_DISCOUNT;
  } else {
    price = days * constants.DAY_PRICE * constants.discount.MD_DISCOUNT;
  }
  return price;
};

const postBooking = async (date: IDateInterval, params: IParams) => {
  let isFree: true | false = false;

  if (checkDays(date)) {
    return "Booking can't be at Monday or Thursday";
  }

  const { rows } = await query(Queries.getFreeRoom, [date.start, date.end]);

  if (!rows) {
    return 'Free rooms does not exists';
  } else {
    const id = Number(params.id);
    isFree = rows.some((el) => {
      return el.r_id === id;
    });
  }

  const time = await query(Queries.getPeriod, [date.start, date.end]);
  const { days } = time.rows[0].period;
  const price = calcPrice(days);

  if (isFree) {
    const a = await query(Queries.insertInDate, [
      date.start,
      date.end,
      params.id,
      price,
    ]);
    return `Congratulations, Your room ${params.id} is booked from ${date.start} to ${date.end}`;
  } else {
    return `Room is already booked from ${date.start} to ${date.end}`;
  }
};

const reportFormating = (rows: IReportRow[]) => {
  const result = {};
  const report = {};

  rows.forEach((el) => {
    const date = new Date(el.date);
    const name = constants.monthNames[date.getMonth()];
    const year = date.getFullYear();
    const stringKey = `${name}-${year}`;
    if (stringKey in result) {
      const load = (Number(el.used) / constants.ROOMS_COUNT) * 100;
      result[stringKey] = {
        customersCount: result[stringKey].customersCount + Number(el.used),
        daysCount: result[stringKey].daysCount + 1,
      };
      report[stringKey] = {
        ...report[stringKey],
        [el.date]: `${load}%`,
      };
    } else {
      const load = (Number(el.used) / constants.ROOMS_COUNT) * 100;
      result[stringKey] = {
        customersCount: Number(el.used),
        daysCount: 1,
      };
      report[stringKey] = {
        [el.date]: `${load}%`,
      };
    }
  });
  report['objDescription'] =
    'obj = { objDescription: string, month-YYYY: { YYYY-MM-DD: load } }';
  return report;
};

const report = async (date: IDateInterval) => {
  const { rows } = await query(Queries.generateReport, [date.start, date.end]);
  const report = reportFormating(rows);
  return report;
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
    return dateIsValid ? getRooms(date) : 'Dates are not valid!!!';
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
    return dateIsValid ? postBooking(date, params) : 'Dates are not valid!!!';
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
    return dateIsValid ? report(date) : 'Dates are not valid!!!';
  }
}
