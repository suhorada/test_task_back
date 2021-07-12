import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import query from './app.database';
import { AppService } from './app.service';
import * as SQL from './utils/queries';

interface IDateInterval {
  start: string;
  end: string;
}

interface IParams {
  id: string;
}

const isValid = (start, end) => {
  const firstDate: any = new Date(start);
  const secondDate: any = new Date(end);
  const d = secondDate - firstDate;
  if (d > 0) return true;
  else return false;
};

const isoDate = (date) => new Date(date + ' 24:');

const formatAllSelection = (data) => {
  const resultArray = [];
  const temp = [];

  data.forEach((element) => {
    temp.push({
      Room: Number(element.json_build_object.Room),
      Date: element.json_build_object.Date,
    });
  });
  return temp;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/room/date?')
  getFreeRooms(@Query() date: IDateInterval) {
    if (!isValid(date.start, date.end)) return 'Dates are not valid!!!';

    const getFree = async () => {
      // if (!isValid(date.start, date.end)) return 'Dates is wrong!!!';
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
      // console.log(
      //   `Request from ${date.start} to ${date.end}, room: ${params.id}`,
      // );

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

      if (days <= 10 && days > 0) price = days * 1000;
      else if (days <= 20) price = days * 1000 * 0.9;
      else price = days * 1000 * 0.8;

      if (isFree) {
        // await query(
        //   `INSERT INTO date ("start", "end", room_id, price, interval)
        //   VALUES ('${date.start}','${date.end}',${params.id},${price},-('${date.start}'::timestamp-'${date.end}'));`,
        // );
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
        `SELECT room.r_id, "date"."start"::timestamp,"date"."end"::timestamp, "date"."interval",date.price FROM room inner JOIN date ON date.room_id = room.r_id
        WHERE ("date"."start"<='2021-01-15' and "date"."end">='2021-01-15')
        or   ("date"."start">='2021-01-15' and "date"."start"<='2021-01-25')`,
      );
      rows.forEach((el: any) => {
        const st = new Date(el.start + ' 3:00').toString().substr(10);
        const en = new Date(el.end + ' 3:00').toString().substr(10);
        console.log(el.start.toString());
        // el.start = `${st.getFullYear()}-${st.getMonth()}-${st.getDay()}`;
        // el.end = `${en.getFullYear()}-${en.getMonth()}-${en.getDay()}`;
      });
      return rows;
    };
    return reporting();
  }
}
