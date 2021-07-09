export const QGetAllRooms = 'SELECT * FROM room';
export const QGetAllRoomsWithDates =
  'SELECT * FROM "public"."room" INNER JOIN "public"."date" ON "public"."room"."r_id" = "public"."date"."room_id"';

// select
//         json_build_object(
//                 'id', u.id,
//                 'name', u.name,
//                 'email', u.email,
//                 'user_role_id', u.user_role_id,
//                 'user_role', json_build_object(
//                         'id', ur.id,
//                         'name', ur.name,
//                         'description', ur.description,
//                         'duty_id', ur.duty_id,
//                         'duty', json_build_object(
//                                 'id', d.id,
//                                 'name', d.name
//                         )
//                 )
//     )
// from users u
// inner join user_roles ur on ur.id = u.user_role_id
// inner join role_duties d on d.id = ur.duty_id;
