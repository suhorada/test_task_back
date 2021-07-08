import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// maybe not here?
import axios, { AxiosResponse } from 'axios';
// import * as pg from 'pg';

const pgConfig = {
  user: 'postgres', //this is the db user credential
  database: 'hotel',
  password: null,
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
};

// const pool = new pg.Pool(pgConfig);

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    // pool.on('connect', () => {
    //   console.log('connected');
    // });
    const getData = async () => {
      // must be as controller ------------------------------
      const axiosResponse: AxiosResponse = await axios
        .get('https://fish-text.ru/get')
        .then((res) => res);
      // must be as controller ------------------------------
      return axiosResponse.data.text;
    };
    return getData();
  }
}
