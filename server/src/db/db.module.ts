import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const dbProvider = {
  provide: 'PG_CONNECTION',
  useValue: new Pool({
    // url: process.env.DB_URL,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: +process.env.DB_PORT,
  }),
};
@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
