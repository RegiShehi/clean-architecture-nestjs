import { Module } from '@nestjs/common';
import { IDataServices } from 'src/domain/abstracts/data-services.abstract';
import { TypeOrmDataServices } from './typeorm-data-services.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import Author from './entities/author.entity';
import Book from './entities/book.entity';
import { DatabaseConfigModule } from 'src/services/configuration/database/database-config.module';
import { IDataBaseConfig } from 'src/domain/abstracts/config/database-config.abstract';

export const getTypeOrmModuleOptions = (
  config: IDataBaseConfig,
): TypeOrmModuleOptions =>
  ({
    type: 'postgres',
    // Since postgres and nestjs are running in docker need to use postgres container name as host
    host: 'clean-architecture-db', //config.getDatabaseHost(),
    port: config.getDatabasePort(),
    username: config.getDatabaseUser(),
    password: config.getDatabasePassword(),
    database: config.getDatabaseName(),
    entities: [__dirname + './../../**/*.entity{.ts,.js}'],
    synchronize: true,
  } as TypeOrmModuleOptions);

@Module({
  imports: [
    TypeOrmModule.forFeature([Author, Book]),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      inject: [IDataBaseConfig],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: TypeOrmDataServices,
    },
  ],
  exports: [IDataServices],
})
export class TypeOrmDataServicesModule {}
