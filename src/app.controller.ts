import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// maybe not here?
import axios, { AxiosResponse } from 'axios';
// import pg = 

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
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
