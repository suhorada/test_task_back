export const QGetAllRooms = 'SELECT * FROM room';
export const QGetAllRoomsWithDates =
  // 'SELECT * FROM "public"."room" INNER JOIN "public"."date" ON "public"."room"."r_id" = "public"."date"."room_id"';
  "select json_build_object('Room', r.r_id, 'Date', json_build_object( 'Start', d.start, 'End', d.end)) from room r INNER join date d on r.r_id = d.room_id";
export const test =
  'SELECT * FROM "public"."room" INNER JOIN "public"."date" ON "public"."room"."r_id" = "public"."date"."room_id"';
