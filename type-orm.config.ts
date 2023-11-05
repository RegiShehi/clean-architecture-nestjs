import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config as configPath } from 'dotenv';
import { DatabaseConfigService } from 'src/infrastructure/services/configuration/database/database-config.service';
import { getTypeOrmModuleOptions } from 'src/infrastructure/services/database/typeorm/typeorm-data-services.module';

configPath({ path: `.env.${process.env.NODE_ENV}` });

const config = new DatabaseConfigService(new ConfigService());

const data = getTypeOrmModuleOptions(
  config,
  config.getDatabaseHost(),
) as DataSourceOptions;

export default new DataSource(data);
