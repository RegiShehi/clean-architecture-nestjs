import { Module } from '@nestjs/common';
import { TypeOrmDataServicesModule } from 'src/infrastructure/database/typeorm/typeorm-data-services.module';

@Module({
  imports: [TypeOrmDataServicesModule],
  exports: [TypeOrmDataServicesModule],
})
export class DataServicesModule {}
