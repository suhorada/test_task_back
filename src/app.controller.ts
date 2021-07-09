import { Controller, Get, Query } from '@nestjs/common';
import query from './app.database';
import { AppService } from './app.service';
import * as SQL from './utils/queries';

interface IDateInterval {
  start: string;
  end: string;
}

// const formatData = () => {

// }

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/room/date?')
  getAllRooms(@Query() date: IDateInterval) {
    const getAllData = async () => {
      const { rows } = await query(SQL.QGetAllRoomsWithDates);
      // const text = `Requested dates: date.start=${date.start} ndate.end=${date.end}`;
      rows.map((el) => (el.start = new Date(el.start + '03:00:00')));
      return rows;
    };
    return getAllData();
  }
}
