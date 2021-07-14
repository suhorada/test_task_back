export const getFreeRoom = `SELECT room.r_id FROM room LEFT JOIN date ON (date.room_id = room.r_id 
       AND NOT ( ("date"."start" < $1 and "date"."end" < $1) 
       OR ("date"."start" > $2 and "date"."end" > $2) )) 
     WHERE date.room_id IS NULL;`;

export const getDayOfDate = (date) => `select extract(dow from date '${date}')`;

export const getPeriod = `select -($1::timestamp-$2) as period limit 1`;

export const insertInDate = `INSERT INTO date ("start", "end", room_id, price, interval)
    VALUES ($1::timestamp, $2::timestamp, $3, $4, -($1::timestamp-$2::timestamp));`;

export const generateReport = `SELECT TO_CHAR(g.d, 'YYYY-MM-DD') AS Date, COUNT(*) AS Used
    FROM generate_series(
        (select $1)::timestamp,
        (select $2)::timestamp, '1 day'
      ) AS g(d)
    INNER JOIN date d
      ON 
      (g.d + INTERVAL '1 day', g.d - INTERVAL '1 day') OVERLAPS (d.start, d.end)
      GROUP BY 1
    HAVING COUNT(*) > 0
    ORDER BY 1`;
