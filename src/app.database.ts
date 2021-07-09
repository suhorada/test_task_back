import { Pool, PoolConfig, QueryResult } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();
const pgConfig: PoolConfig = {
  user: process.env.PG_SUPERUSER,
  database: process.env.PG_DB,
  password: null,
  port: Number(process.env.PG_PORT),
};

const pool = new Pool(pgConfig);
const query = async (text: string): Promise<QueryResult> => {
  return await pool
    .query(text)
    .then((res) => res)
    .catch((err) => err);
};

export default query;
