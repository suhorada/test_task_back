import { Test, TestingModule } from '@nestjs/testing';
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

  describe('root', () => {
    it('should return ...', () => {
      expect(
        appController.getFreeRooms({ start: '2021-01-01', end: '2021-01-31' }),
      ).toBe([Rooms]);
    });
  });
});
