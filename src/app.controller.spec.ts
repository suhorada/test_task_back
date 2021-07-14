import { Test, TestingModule } from '@nestjs/testing';
import * as test from '../test/app.tests';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-01-01',
          end: '2021-01-13',
        },
        { id: '1' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-01-01', '2021-01-13', '1'),
      );
    });
  });

  describe('bookAlreadyBookedDates', () => {
    it('should return answer about wrong booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-01-01',
          end: '2021-01-13',
        },
        { id: '1' },
      );
      expect(result).toStrictEqual(
        test.brokenBooking('2021-01-01', '2021-01-13'),
      );
    });
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

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-01-01',
          end: '2021-01-13',
        },
        { id: '2' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-01-01', '2021-01-13', '2'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-01-01',
          end: '2021-01-13',
        },
        { id: '3' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-01-01', '2021-01-13', '3'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-01-01',
          end: '2021-01-13',
        },
        { id: '4' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-01-01', '2021-01-13', '4'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-01-01',
          end: '2021-01-13',
        },
        { id: '5' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-01-01', '2021-01-13', '5'),
      );
    });
  });
  // ------------------------------------------------------------------------------------------------------
  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-02-01',
          end: '2021-02-13',
        },
        { id: '1' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-02-01', '2021-02-13', '1'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-02-01',
          end: '2021-02-13',
        },
        { id: '2' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-02-01', '2021-02-13', '2'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-02-01',
          end: '2021-02-13',
        },
        { id: '3' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-02-01', '2021-02-13', '3'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-02-01',
          end: '2021-02-13',
        },
        { id: '4' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-02-01', '2021-02-13', '4'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-02-01',
          end: '2021-02-13',
        },
        { id: '5' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-02-01', '2021-02-13', '5'),
      );
    });
  });
  // ---------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-02-25',
          end: '2021-02-28',
        },
        { id: '1' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-02-25', '2021-02-28', '1'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-02-25',
          end: '2021-02-28',
        },
        { id: '2' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-02-25', '2021-02-28', '2'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-02-25',
          end: '2021-02-28',
        },
        { id: '3' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-02-25', '2021-02-28', '3'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-02-25',
          end: '2021-02-28',
        },
        { id: '4' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-02-25', '2021-02-28', '4'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-02-25',
          end: '2021-02-28',
        },
        { id: '5' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-02-25', '2021-02-28', '5'),
      );
    });
  });

  // -----------------------------------------------------------------------------------------

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-03-01',
          end: '2021-03-07',
        },
        { id: '5' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-03-01', '2021-03-07', '5'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-03-10',
          end: '2021-03-17',
        },
        { id: '5' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-03-10', '2021-03-17', '5'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-03-18',
          end: '2021-03-20',
        },
        { id: '5' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-03-18', '2021-03-20', '5'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-03-21',
          end: '2021-03-23',
        },
        { id: '5' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-03-21', '2021-03-23', '5'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-03-25',
          end: '2021-03-27',
        },
        { id: '5' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-03-25', '2021-03-27', '5'),
      );
    });
  });

  // -------------------------------------------------------------------------------------------

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-05-01',
          end: '2021-05-07',
        },
        { id: '1' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-05-01', '2021-05-07', '1'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-05-10',
          end: '2021-05-17',
        },
        { id: '1' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-05-10', '2021-05-17', '1'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-05-18',
          end: '2021-05-20',
        },
        { id: '1' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-05-18', '2021-05-20', '1'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-05-21',
          end: '2021-05-23',
        },
        { id: '1' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-05-21', '2021-05-23', '1'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-05-25',
          end: '2021-05-27',
        },
        { id: '1' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-05-25', '2021-05-27', '1'),
      );
    });
  });

  // ---------------------------------------------------------------------------------------

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-04-01',
          end: '2021-04-07',
        },
        { id: '2' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-04-01', '2021-04-07', '2'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-04-10',
          end: '2021-04-17',
        },
        { id: '2' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-04-10', '2021-04-17', '2'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-04-18',
          end: '2021-04-20',
        },
        { id: '2' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-04-18', '2021-04-20', '2'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-04-21',
          end: '2021-04-23',
        },
        { id: '2' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-04-21', '2021-04-23', '2'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-04-25',
          end: '2021-04-27',
        },
        { id: '2' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-04-25', '2021-04-27', '2'),
      );
    });
  });

  // ----------------------------------------------------------------------------------------------------------
  // ==========================================================================================================
  // ----------------------------------------------------------------------------------------------------------

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-08-01',
          end: '2021-08-31',
        },
        { id: '1' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-08-01', '2021-08-31', '1'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-08-01',
          end: '2021-08-31',
        },
        { id: '2' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-08-01', '2021-08-31', '2'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-08-01',
          end: '2021-08-31',
        },
        { id: '3' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-08-01', '2021-08-31', '3'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-08-01',
          end: '2021-08-31',
        },
        { id: '4' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-08-01', '2021-08-31', '4'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-08-01',
          end: '2021-08-31',
        },
        { id: '5' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-08-01', '2021-08-31', '5'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-07-01',
          end: '2021-07-21',
        },
        { id: '1' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-07-01', '2021-07-21', '1'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-07-01',
          end: '2021-07-21',
        },
        { id: '2' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-07-01', '2021-07-21', '2'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-07-01',
          end: '2021-07-21',
        },
        { id: '3' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-07-01', '2021-07-21', '3'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-07-01',
          end: '2021-07-21',
        },
        { id: '4' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-07-01', '2021-07-21', '4'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-07-01',
          end: '2021-07-21',
        },
        { id: '5' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-07-01', '2021-07-21', '5'),
      );
    });
  });

  // ----------------------------------------------------------------------------------------------------------
  // ==========================================================================================================
  // ----------------------------------------------------------------------------------------------------------

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-10-01',
          end: '2021-10-31',
        },
        { id: '1' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-10-01', '2021-10-31', '1'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-10-01',
          end: '2021-10-31',
        },
        { id: '2' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-10-01', '2021-10-31', '2'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-10-01',
          end: '2021-10-31',
        },
        { id: '3' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-10-01', '2021-10-31', '3'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-10-01',
          end: '2021-10-31',
        },
        { id: '4' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-10-01', '2021-10-31', '4'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-10-01',
          end: '2021-10-31',
        },
        { id: '5' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-10-01', '2021-10-31', '5'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-11-01',
          end: '2021-11-21',
        },
        { id: '1' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-11-01', '2021-11-21', '1'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-11-01',
          end: '2021-11-21',
        },
        { id: '2' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-11-01', '2021-11-21', '2'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-11-01',
          end: '2021-11-21',
        },
        { id: '3' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-11-01', '2021-11-21', '3'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-11-01',
          end: '2021-11-21',
        },
        { id: '4' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-11-01', '2021-11-21', '4'),
      );
    });
  });

  describe('bookRoom', () => {
    it('should return answer about booking', async () => {
      const result = await appController.dealRoom(
        {
          start: '2021-11-01',
          end: '2021-11-21',
        },
        { id: '5' },
      );
      expect(result).toStrictEqual(
        test.successBooking('2021-11-01', '2021-11-21', '5'),
      );
    });
  });

  describe('getFreeRooms - invalid date', () => {
    it('should return free rooms for a dates', async () => {
      const result = await appController.getFreeRooms({
        start: '2021-02-14',
        end: '2021-01-15',
      });
      expect(result).toStrictEqual(test.invalidDate);
    });
  });

  describe('getReport', () => {
    it('should return report for a dates', async () => {
      const result = await appController.getReport({
        start: '2021-01-01',
        end: '2021-12-14',
      });
      expect(result).toStrictEqual(test.report);
    });
  });
});
