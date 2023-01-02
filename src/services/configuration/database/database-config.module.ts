import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigService } from './database-config.service';
import { IDataBaseConfig } from 'src/domain/abstracts/config/database-config.abstract';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
  ],
  providers: [
    {
      provide: IDataBaseConfig,
      useClass: DatabaseConfigService,
    },
  ],
  exports: [IDataBaseConfig],
})
export class DatabaseConfigModule {}
