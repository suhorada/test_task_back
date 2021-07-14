// export const getFreeRoom = (dates) => {
//   return `SELECT room.r_id FROM room LEFT JOIN date ON (date.room_id = room.r_id 
//        AND NOT ( ("date"."start" < '${dates.start}' and "date"."end" < '${dates.start}') 
//        OR ("date"."start" > '${dates.end}' and "date"."end" > '${dates.end}') )) 
//      WHERE date.room_id IS NULL;`;
// };
export const getFreeRoom = () => {
  return `SELECT room.r_id FROM room LEFT JOIN date ON (date.room_id = room.r_id 
       AND NOT ( ("date"."start" < $1 and "date"."end" < $1) 
       OR ("date"."start" > $2 and "date"."end" > $2) )) 
     WHERE date.room_id IS NULL;`;
};

export const getDayOfDate = (date) => {
  return `select extract(dow from date '${date}');`;
};

export const getPeriod = (dates) => {
  return `select -('${dates.start}'::timestamp-'${dates.end}') as period`;
};

export const insertInDate = (dates, room, price) => {
  return `INSERT INTO date ("start", "end", room_id, price, interval)
    VALUES ('${dates.start}','${dates.end}',${room},${price},-('${dates.start}'::timestamp-'${dates.end}'));`;
};

export const generateReport = (dates) => {
  return `SELECT TO_CHAR(g.d, 'YYYY-MM-DD') AS Date, COUNT(*) AS Used
    FROM generate_series(
        (select '${dates.start}')::timestamp,
        (select '${dates.end}')::timestamp, '1 day'
      ) AS g(d)
    INNER JOIN date d
      ON 
      (g.d + INTERVAL '1 day', g.d - INTERVAL '1 day') OVERLAPS (d.start, d.end)
      GROUP BY 1
    HAVING COUNT(*) > 0
    ORDER BY 1`;
};
