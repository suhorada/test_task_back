import { ApiProperty } from '@nestjs/swagger';

export class DateQuery {
  @ApiProperty()
  start: string;
  @ApiProperty()
  end: string;
}

export class IdParam {
  @ApiProperty()
  id: string;
}

export class Rooms {
  @ApiProperty()
  r_id: number;
}

export class DayLoad {
  @ApiProperty()
  ['YYYY-MM-DD']: string;
}

export class Report {
  @ApiProperty()
  ['Month-YYYY']: DayLoad;
}
