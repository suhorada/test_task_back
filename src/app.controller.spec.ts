import { Test, TestingModule } from '@nestjs/testing';
import * as test from '../test/app.tests';
import { AppController } from './app.controller';
import { AppService } from './app.service';

class Rooms {
  r_id: number;
}

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getFreeRooms', () => {
    it('should return free rooms for a dates', async () => {
      const result = await appController.getFreeRooms({
        start: '2021-01-01',
        end: '2021-01-14',
      });
      expect(result).toStrictEqual(test.getFreeRooms);
    });
  });

  describe('getFreeRooms - invalid date', () => {
    it('should return free rooms for a dates', async () => {
      const result = await appController.getFreeRooms({
        start: '2021-02-01',
        end: '2021-01-14',
      });
      expect(result).toStrictEqual(test.invalidDate);
    });
  });

  describe('getReport', () => {
    it('should return report for a dates', async () => {
      const result = await appController.getReport({
        start: '2021-01-01',
        end: '2021-01-14',
      });
      expect(result).toStrictEqual(test.report);
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-02-02',
          end: '2021-02-13',
        },
        { id: '1' },
      );
      expect(result).toStrictEqual(test.book0);
    });
  });

  describe('bookRoom', () => {
    it('should return answer about wrong booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-02-02',
          end: '2021-02-13',
        },
        { id: '1' },
      );
      expect(result).toStrictEqual(test.book1);
    });
  });
});
