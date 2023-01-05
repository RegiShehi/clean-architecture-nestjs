import { Module } from '@nestjs/common';
import { IDataServices } from 'src/domain/abstracts/data-services.abstract';
import { TypeOrmDataServices } from './typeorm-data-services.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IDataBaseConfig } from 'src/domain/abstracts/config/database-config.abstract';
import { BookEntity } from './entities/book.entity';
import { UserEntity } from './entities/user.entity';
import { AuthorEntity } from './entities/author.entity';
import { DatabaseConfigModule } from '../../configuration/database/database-config.module';

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
    TypeOrmModule.forFeature([AuthorEntity, BookEntity, UserEntity]),
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
