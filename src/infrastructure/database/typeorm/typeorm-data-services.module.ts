import { Module } from '@nestjs/common';
import { IDataServices } from 'src/domain/abstracts/data-services.abstract';
import { TypeOrmDataServices } from './typeorm-data-services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Author from './entities/author.entity';
import Book from './entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Author, Book]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [__dirname + './../../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
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
