import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource } from 'typeorm';

let envFile = '.env';
if (process.env.NODE_ENV === 'test') {
  envFile = '.env.test';
}

//eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: envFile });

export const datasource = new DataSource({
  type: 'postgres',
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_NAME,
  dropSchema: false,
  synchronize: true,
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migration/*{.ts,.js}'],
  migrationsTableName: 'migration',
});

export const typeOrmConfig: TypeOrmModuleOptions =
  process.env.NODE_ENV !== 'test'
    ? {
        ...(process.env.DB_SSL !== 'false'
          ? {
              ssl: {
                rejectUnauthorized: false,
              },
            }
          : {}),
        schema: process.env.DB_SCHEMA || 'public',
        type: 'postgres',
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_NAME,
        autoLoadEntities: true,
        // synchronize: true,
        ssl: false,
        ...(process.env.MIGRATION === 'true'
          ? {
              entities: ['dist/**/*.entity{.ts,.js}'],
              migrations: ['dist/migration/*{.ts,.js}'],
              cli: {
                migrationsDir: 'src/migration',
              },
            }
          : { entities: ['dist/**/*.entity{.ts,.js}'] }),
      }
    : {
        type: 'postgres',
        database: process.env.DB_TEST_NAME,
        host: process.env.DB_TEST_HOST,
        port: +process.env.DB_TEST_PORT,
        username: process.env.DB_TEST_USERNAME,
        password: process.env.DB_TEST_PASSWORD,
        dropSchema: true,
        synchronize: true,
        autoLoadEntities: true,
        entities: [join(__dirname, '../../src', '/**/*.entity{.ts,.js}')],
        logging: false,
        migrations: [join(__dirname, 'migration', '*{.ts,.js}')],
        migrationsTableName: 'migration',
      };

console.log('NODE_ENV:', process.env.NODE_ENV, typeOrmConfig);
